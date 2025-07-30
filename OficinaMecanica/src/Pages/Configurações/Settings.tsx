import { useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Avatar } from "primereact/avatar";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { Theme } from "../../contexts/ThemeProvider";
import { useTheme } from "../../contexts/useTheme";
import { useToast } from "../../contexts/useToast";

const Settings = () => {
  // Estado para as configurações do perfil
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const userId = user?.id ?? null;
  const [, setAvatarUrl] = useState<string | null>(null);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);

  // Preferências do sistema
  const { theme, setTheme } = useTheme();
  const [temaSelecionado, setTemaSelecionado] = useState<Theme>(theme);
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesApp, setNotificacoesApp] = useState(true);
  const [idioma, setIdioma] = useState("pt-BR");

  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const { showToast } = useToast();

  // Base URL para imagens
  const baseURL = api.defaults.baseURL?.replace(/\/api$/, "") || "";

  const temas = [
    { name: "Claro", value: "light" },
    { name: "Escuro", value: "dark" },
    { name: "Sistema", value: "system" },
  ];

  const idiomas = [
    { name: "Português (BR)", value: "pt-BR" },
    { name: "English (US)", value: "en-US" },
    { name: "Español", value: "es" },
  ];

  // Aplica o tema visualmente ao selecionar, mas só salva ao clicar em Salvar Preferências
  useEffect(() => {
    setTheme(temaSelecionado);
    // eslint-disable-next-line
  }, [temaSelecionado]);

  // Ao desmontar, se não salvou, restaura o tema global
  useEffect(() => {
    return () => {
      setTheme(theme);
    };
    // eslint-disable-next-line
  }, []);

  // Salva a escolha do tema no contexto e localStorage ao salvar preferências
  const handleSavePreferences = () => {
    setTheme(temaSelecionado); // Garante atualização do contexto global
    localStorage.setItem("app-theme", temaSelecionado);
    showToast("Preferências salvas com sucesso!", "success");
  };

  // Salva as alterações do perfil
  const handleSaveProfile = async () => {
    if (!userId) return;
    try {
      await api.put(`/usuarios/${userId}`, { nome, email });
      // Atualiza nome e email no contexto e localStorage
      const updatedUser = {
        ...user,
        nome: nome,
        email: email,
        id: typeof user?.id === "number" ? user.id : Number(user?.id) || 0,
        cargo: user?.cargo ?? "",
        avatar: user?.avatar ?? "",
      };
      localStorage.setItem(
        "@OficinaMecanica:user",
        JSON.stringify(updatedUser)
      );
      if (setUser) setUser(updatedUser);

      // Só faz upload do avatar se houver alteração
      if (pendingAvatar) {
        const formData = new FormData();
        formData.append("avatar", pendingAvatar);
        const response = await api.post(`/usuarios/${userId}/avatar`, formData);
        if (response.status === 200) {
          setAvatarUrl(response.data.avatar);
          const updatedUserWithAvatar = {
            ...updatedUser,
            avatar: response.data.avatar,
          };
          localStorage.setItem(
            "@OficinaMecanica:user",
            JSON.stringify(updatedUserWithAvatar)
          );
          if (setUser) setUser(updatedUserWithAvatar);
        }
        setPendingAvatar(null);
      }

      showToast("Perfil salvo com sucesso!", "success");
    } catch {
      showToast("Erro ao salvar perfil.", "error");
    }
  };

  // Busca as informações do usuário ao carregar a página
  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const response = await api.get(`/usuarios/${userId}`);
        if (response.data && response.data.avatar)
          setAvatarUrl(response.data.avatar);
        if (response.data && response.data.nome) setNome(response.data.nome);
        if (response.data && response.data.email) setEmail(response.data.email);
      } catch {
        // Não faz nada, usuário pode não estar logado
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Header title="Configurações" />

        <TabView>
          <TabPanel header="Perfil" leftIcon="pi pi-user mr-2">
            <div className="grid">
              <div className="col-12 md:col-6 lg:col-4">
                <Card className="dashboard-card">
                  <div
                    className="flex flex-column align-items-center"
                    style={{ position: "relative" }}
                  >
                    {/* Avatar igual ao Header */}
                    {user?.avatar && user.avatar !== "[]" ? (
                      <>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Avatar
                            image={`${baseURL}/${user.avatar.replace(
                              /^\/?/,
                              ""
                            )}`}
                            shape="circle"
                            style={{ width: "100px", height: "100px" }}
                            className="mb-3"
                          />
                          <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger p-button-sm avatar-remove-btn"
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              zIndex: 2,
                              width: 32,
                              height: 32,
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            onClick={() => setShowRemoveDialog(true)}
                          />
                        </div>
                        <Dialog
                          header="Remover Foto de Perfil"
                          visible={showRemoveDialog}
                          style={{ width: "350px" }}
                          onHide={() => setShowRemoveDialog(false)}
                          footer={
                            <div>
                              <Button
                                label="Cancelar"
                                icon="pi pi-times"
                                className="p-button-text"
                                onClick={() => setShowRemoveDialog(false)}
                              />
                              <Button
                                label="Remover"
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={async () => {
                                  if (!userId) return;
                                  try {
                                    await api.delete(
                                      `/usuarios/${userId}/avatar`
                                    );
                                    const updatedUser = {
                                      ...user,
                                      avatar: "",
                                      id:
                                        typeof user?.id === "number"
                                          ? user.id
                                          : Number(user?.id) || 0,
                                    };
                                    localStorage.setItem(
                                      "@OficinaMecanica:user",
                                      JSON.stringify(updatedUser)
                                    );
                                    if (setUser) setUser(updatedUser);
                                    showToast("Avatar removido!", "success");
                                  } catch {
                                    showToast(
                                      "Erro ao remover avatar.",
                                      "error"
                                    );
                                  }
                                  setShowRemoveDialog(false);
                                }}
                              />
                            </div>
                          }
                        >
                          <span>
                            Tem certeza que deseja remover sua foto de perfil?
                          </span>
                        </Dialog>
                      </>
                    ) : (
                      <Avatar
                        icon="pi pi-user"
                        size="xlarge"
                        style={{
                          backgroundColor: "var(--surface-border)",
                          color: "#ffffff",
                          width: "80px",
                          height: "80px",
                        }}
                        shape="circle"
                        className="mb-3"
                      />
                    )}
                    <h3 className="mt-2 mb-3">Foto de Perfil</h3>
                    <FileUpload
                      mode="basic"
                      name="avatar"
                      auto={false}
                      accept="image/*"
                      maxFileSize={1000000}
                      chooseLabel="Selecionar Foto"
                      className="w-full"
                      customUpload={false}
                      onSelect={async (e) => {
                        if (e.files && e.files[0] && userId) {
                          const file = e.files[0];
                          const formData = new FormData();
                          formData.append("avatar", file);
                          try {
                            const response = await api.post(
                              `/usuarios/${userId}/avatar`,
                              formData
                            );
                            if (response.status === 200) {
                              const updatedUser = {
                                ...user,
                                avatar: response.data.avatar,
                                id:
                                  typeof user?.id === "number"
                                    ? user.id
                                    : Number(user?.id) || 0,
                                nome: user?.nome ?? "",
                                email: user?.email ?? "",
                                cargo: user?.cargo ?? "",
                              };
                              localStorage.setItem(
                                "@OficinaMecanica:user",
                                JSON.stringify(updatedUser)
                              );
                              if (setUser) setUser(updatedUser);
                              if (setUser) setUser(updatedUser);
                              showToast("Avatar atualizado!", "success");
                            }
                          } catch {
                            showToast("Erro ao enviar avatar.", "error");
                          }
                        }
                      }}
                    />
                  </div>
                </Card>
              </div>

              <div className="col-12 md:col-6 lg:col-8">
                <Card title="Informações Pessoais" className="dashboard-card">
                  <div className="p-fluid">
                    <div className="field mb-4">
                      <label
                        htmlFor="nome"
                        className="font-medium mb-2 inline-block"
                      >
                        Nome Completo
                      </label>
                      <InputText
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>

                    <div className="field mb-4">
                      <label
                        htmlFor="email"
                        className="font-medium mb-2 inline-block"
                      >
                        Email
                      </label>
                      <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </Card>

                <Card title="Alterar Senha" className="dashboard-card mt-3">
                  <div className="p-fluid">
                    <div className="field mb-4">
                      <label
                        htmlFor="senha"
                        className="font-medium mb-2 inline-block"
                      >
                        Nova Senha
                      </label>
                      <Password
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        toggleMask
                        feedback={false}
                      />
                    </div>

                    <div className="field mb-4">
                      <label
                        htmlFor="confirmSenha"
                        className="font-medium mb-2 inline-block"
                      >
                        Confirmar Senha
                      </label>
                      <Password
                        id="confirmSenha"
                        value={confirmSenha}
                        onChange={(e) => setConfirmSenha(e.target.value)}
                        toggleMask
                        feedback={false}
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-content-end mt-3 mr-3">
                  <Button
                    label="Salvar Alterações"
                    icon="pi pi-save"
                    className="p-button-success"
                    onClick={handleSaveProfile}
                  />
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel header="Preferências" leftIcon="pi pi-cog mr-2">
            <div className="grid">
              <div className="col-12">
                <Card title="Aparência e Idioma" className="dashboard-card">
                  <div className="p-fluid">
                    <div className="field mb-4 flex align-items-center justify-content-between">
                      <label
                        htmlFor="tema"
                        className="font-medium inline-block"
                      >
                        Tema
                      </label>
                      <Dropdown
                        id="tema"
                        value={temaSelecionado}
                        options={temas}
                        onChange={(e) => setTemaSelecionado(e.value as Theme)}
                        optionLabel="name"
                        style={{ width: "14rem" }}
                      />
                    </div>

                    <div className="field mb-4 flex align-items-center justify-content-between">
                      <label
                        htmlFor="idioma"
                        className="font-medium inline-block"
                      >
                        Idioma
                      </label>
                      <Dropdown
                        id="idioma"
                        value={idioma}
                        options={idiomas}
                        onChange={(e) => setIdioma(e.value)}
                        optionLabel="name"
                        style={{ width: "14rem" }}
                      />
                    </div>
                  </div>
                </Card>

                <Card title="Notificações" className="dashboard-card mt-3">
                  <div className="p-fluid">
                    <div className="field mb-4 flex align-items-center justify-content-between">
                      <label
                        htmlFor="notificacoesEmail"
                        className="font-medium inline-block"
                      >
                        Receber notificações por email
                      </label>
                      <InputSwitch
                        id="notificacoesEmail"
                        checked={notificacoesEmail}
                        onChange={(e) => setNotificacoesEmail(e.value)}
                      />
                    </div>

                    <div className="field mb-4 flex align-items-center justify-content-between">
                      <label
                        htmlFor="notificacoesApp"
                        className="font-medium inline-block"
                      >
                        Notificações no aplicativo
                      </label>
                      <InputSwitch
                        id="notificacoesApp"
                        checked={notificacoesApp}
                        onChange={(e) => setNotificacoesApp(e.value)}
                      />
                    </div>
                  </div>
                </Card>

                <div className="flex justify-content-end mt-3">
                  <Button
                    label="Salvar Preferências"
                    icon="pi pi-save"
                    className="p-button-success"
                    onClick={handleSavePreferences}
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Settings;

import { useState } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Avatar } from "primereact/avatar";
import { FileUpload } from "primereact/fileupload";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  // Estado para as configurações
  const [nome, setNome] = useState("Guinho");
  const [email, setEmail] = useState("admin@autorepair.com");
  const [telefone, setTelefone] = useState("(12) 98765-4321");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  // Preferências do sistema
  const [tema, setTema] = useState("light");
  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [notificacoesApp, setNotificacoesApp] = useState(true);
  const [idioma, setIdioma] = useState("pt-BR");

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

  const handleSaveProfile = () => {
    // Implementação futura para salvar o perfil
    alert("Perfil salvo com sucesso!");
  };

  const handleSavePreferences = () => {
    // Implementação futura para salvar preferências
    alert("Preferências salvas com sucesso!");
  };

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
                  <div className="flex flex-column align-items-center">
                    <Avatar
                      icon="pi pi-user"
                      size="xlarge"
                      shape="circle"
                      className="mb-3"
                    />
                    <h3 className="mt-2 mb-3">Foto de Perfil</h3>
                    <FileUpload
                      mode="basic"
                      name="avatar"
                      auto
                      accept="image/*"
                      maxFileSize={1000000}
                      chooseLabel="Alterar Foto"
                      className="w-full"
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

                    <div className="field mb-4">
                      <label
                        htmlFor="telefone"
                        className="font-medium mb-2 inline-block"
                      >
                        Telefone
                      </label>
                      <InputText
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
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

                <div className="flex justify-content-end mt-3">
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
                        value={tema}
                        options={temas}
                        onChange={(e) => setTema(e.value)}
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

import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { User } from "../../types/types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { validateCPF } from "../../utils/validator";

interface FuncionariosViewProps {
  visible: boolean;
  onHide: () => void;
  usuario: User | null;
  onSave: (user: Partial<User>) => void;
}

const FuncionariosView = ({
  visible,
  onHide,
  usuario,
  onSave,
}: FuncionariosViewProps) => {
  const [cpf, setCpf] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [editandoCpf, setEditandoCpf] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (usuario) {
      setCpf(usuario.cpf || "");
      setCpfError(null);
    }
  }, [usuario, visible]);

  const handleSave = () => {
    if (!cpf || !validateCPF(cpf)) {
      setCpfError("CPF inválido");
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "CPF inválido",
        life: 3000,
      });
      return;
    }
    setCpfError(null);
    onSave({
      id: usuario?.id,
      cpf: cpf ?? "",
    });
    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: "CPF salvo com sucesso!",
      life: 2000,
    });
    onHide();
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Dados do Funcionário"
        visible={visible}
        onHide={onHide}
        modal
        style={{ width: 400 }}
        className="funcionarios-dialog"
      >
        <div className="p-fluid" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 16 }}>
            {usuario?.avatar ? (
              <div className="cracha-avatar">
                <img src={usuario.avatar} alt="Avatar" />
              </div>
            ) : (
              <div className="cracha-avatar">
                <span>?</span>
              </div>
            )}
            <div className="cracha-nome">{usuario?.nome ?? ""}</div>
            <div className="cracha-cargo">{usuario?.cargo ?? ""}</div>
          </div>
          <div className="p-field mb-2">
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>
              Email:
            </span>{" "}
            <span style={{ color: "var(--text-light)" }}>
              {usuario?.email ?? ""}
            </span>
          </div>
          <div className="p-field mb-2">
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>
              Status:
            </span>{" "}
            <span style={{ color: "var(--text-light)" }}>
              {usuario?.status ?? ""}
            </span>
          </div>
          <div className="p-field mb-2">
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>
              Férias:
            </span>{" "}
            <span style={{ color: "var(--text-light)" }}>
              {usuario?.ferias ? "Sim" : "Não"}
            </span>
          </div>
          <div className="p-field mb-2">
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>
              Data de Admissão:
            </span>{" "}
            <span style={{ color: "var(--text-light)" }}>
              {usuario?.dataAdmissao
                ? new Date(usuario.dataAdmissao).toLocaleDateString("pt-BR")
                : ""}
            </span>
          </div>
          <div
            className="p-field mb-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 600, color: "var(--primary)" }}>
              CPF:
            </span>
            {editandoCpf ? (
              <>
                <InputText
                  id="cpf"
                  value={cpf || ""}
                  onChange={(e) => setCpf(e.target.value)}
                  maxLength={11}
                  placeholder="Digite o CPF"
                  style={{ width: 120, marginTop: 0, marginBottom: 0 }}
                  className={cpfError ? "p-invalid" : ""}
                />
                <Button
                  icon="pi pi-check"
                  className="p-button-text p-button-sm"
                  onClick={handleSave}
                  style={{ marginLeft: 4 }}
                />
                <Button
                  icon="pi pi-times"
                  className="p-button-text p-button-sm"
                  onClick={() => {
                    setEditandoCpf(false);
                    setCpf(usuario?.cpf || "");
                    setCpfError(null);
                  }}
                />
                {cpfError && (
                  <small style={{ color: "red", display: "block" }}>
                    {cpfError}
                  </small>
                )}
              </>
            ) : (
              <>
                <span style={{ marginLeft: 1, color: "var(--text-light)" }}>
                  {cpf ? cpf : "Nenhum CPF cadastrado a este usuário"}
                </span>
                <Button
                  icon="pi pi-pencil"
                  className="p-button-text p-button-sm"
                  onClick={() => setEditandoCpf(true)}
                  style={{
                    marginLeft: 4,
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    minWidth: 0,
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-label="Editar CPF"
                />
              </>
            )}
          </div>
        </div>
        <div
          className="p-d-flex"
          style={{ justifyContent: "flex-end", gap: 8 }}
        >
          <Button label="Fechar" className="p-button-text" onClick={onHide} />
        </div>
      </Dialog>
    </>
  );
};

export default FuncionariosView;

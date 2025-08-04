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
        header="Crachá do Funcionário"
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
            <span
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              ID:
            </span>{" "}
            <span>{usuario?.id ?? ""}</span>
          </div>
          <div className="p-field mb-2">
            <span
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              Email:
            </span>{" "}
            <span>{usuario?.email ?? ""}</span>
          </div>
          <div className="p-field mb-2">
            <span
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              Status:
            </span>{" "}
            <span>{usuario?.status ?? ""}</span>
          </div>
          <div className="p-field mb-2">
            <span
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              Férias:
            </span>{" "}
            <span>{usuario?.ferias ? "Sim" : "Não"}</span>
          </div>
          <div className="p-field mb-2">
            <span
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              Data de Admissão:
            </span>{" "}
            <span>
              {usuario?.dataAdmissao
                ? new Date(usuario.dataAdmissao).toLocaleDateString("pt-BR")
                : ""}
            </span>
          </div>
          <div className="p-field mb-2">
            <label
              htmlFor="cpf"
              style={{
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              CPF:
            </label>
            <InputText
              id="cpf"
              value={cpf || ""}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={11}
              placeholder="Digite o CPF"
              style={{ width: "100%", marginTop: 4, marginBottom: 0 }}
              className={cpfError ? "p-invalid" : ""}
            />
            {cpfError && <small style={{ color: "red" }}>{cpfError}</small>}
          </div>
        </div>
        <div
          className="p-d-flex"
          style={{ justifyContent: "flex-end", gap: 8 }}
        >
          <Button label="Fechar" className="p-button-text" onClick={onHide} />
          <Button
            label="Salvar CPF"
            className="p-button-success"
            onClick={handleSave}
          />
        </div>
      </Dialog>
    </>
  );
};

export default FuncionariosView;

import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface FuncionariosDeleteProps {
  visible: boolean;
  usuario?: { id: number; nome: string };
  onHide: () => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const FuncionariosDelete = ({
  visible,
  usuario,
  onHide,
  onDelete,
  loading = false,
}: FuncionariosDeleteProps) => {
  const [pendingDelete, setPendingDelete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toast = useRef<Toast>(null);

  const handleDeleteClick = () => {
    setPendingDelete(true);
    timerRef.current = setTimeout(() => {
      if (usuario) {
        onDelete(usuario.id);
        toast.current?.show({
          severity: "success",
          summary: "Usuário deletado",
          detail: "Usuário deletado com sucesso",
          life: 3000,
        });
      }
      setPendingDelete(false);
    }, 5000);
  };

  const handleCancel = () => {
    setPendingDelete(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    toast.current?.show({
      severity: "info",
      summary: "Exclusão cancelada",
      detail: "Processo de exclusão cancelado",
      life: 2500,
    });
    onHide();
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={
          <span
            className="p-dialog-title"
            style={{ color: "var(--text-light)" }}
          >
            Confirmar exclusão
          </span>
        }
        visible={visible}
        onHide={handleCancel}
        modal
        style={{ width: 400, borderRadius: 12 }}
        className="funcionarios-dialog"
        contentStyle={{
          padding: "2rem 2rem 1.5rem 2rem",
          background: "var(--background-alt)",
        }}
        headerStyle={{
          background: "var(--primary)",
          color: "var(--text-light)",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          padding: "1.2rem 2rem 1rem 2rem",
        }}
        footer={
          <div
            className="p-d-flex p-jc-end"
            style={{
              gap: "0.5rem",
              background: "var(--background-alt)",
              padding: "1rem 2rem",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-text"
              style={{ color: "var(--danger)" }}
              onClick={handleCancel}
              disabled={loading}
            />
            <Button
              label={pendingDelete ? "Excluindo..." : "Excluir"}
              icon="pi pi-trash"
              className="p-button"
              style={{
                background: "var(--primary)",
                borderColor: "var(--primary)",
                color: "#fff",
              }}
              onClick={handleDeleteClick}
              loading={pendingDelete || loading}
              disabled={pendingDelete || loading}
            />
          </div>
        }
      >
        <div className="p-fluid" style={{ textAlign: "center" }}>
          <div style={{ marginBottom: 16 }}>
            <div className="cracha-nome">{usuario?.nome ?? ""}</div>
          </div>
          <span style={{ color: "var(--text-light)", fontSize: 16 }}>
            Tem certeza que deseja excluir o usuário{" "}
            <strong style={{ color: "var(--primary)" }}>{usuario?.nome}</strong>
            ?
          </span>
          {pendingDelete && (
            <div
              style={{
                marginTop: 12,
                color: "var(--danger)",
                fontWeight: 600,
              }}
            >
              Excluindo em 5 segundos... Clique em cancelar para interromper.
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default FuncionariosDelete;

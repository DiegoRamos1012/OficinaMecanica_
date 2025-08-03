import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { User } from "../../types/types";

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

  useEffect(() => {
    if (usuario) {
      setCpf(usuario.cpf || null)
    }
  }, [usuario, visible]);

   const handleSave = () => {
    onSave({
      id: usuario?.id,
      cpf: usuario?.cpf
    });
    onHide();
  };

return (
    <Dialog
        header="Detalhes do Funcionário"
        visible={visible}
        onHide={onHide}
        modal
    >
        <div>
            <p><strong>CPF:</strong> {cpf || "Não informado"}</p>
        </div>
    </Dialog>
)

};

export default FuncionariosView;

import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { User } from "../../types/types";

interface FuncionariosEditProps {
  visible: boolean;
  onHide: () => void;
  usuario: User | null;
  onSave: (user: Partial<User>) => void;
}

const statusOptions = [
  { label: "Ativo", value: "Ativo" },
  { label: "Inativo", value: "Inativo" },
];

const cargoOptions = [
  { label: "Mecânico", value: "Mecânico" },
  { label: "Administrativo", value: "Administrativo" },
  { label: "Gerente", value: "Gerente" },
  { label: "Outro", value: "Outro" },
];

const FuncionariosEdit = ({
  visible,
  onHide,
  usuario,
  onSave,
}: FuncionariosEditProps) => {
  const [dataAdmissao, setDataAdmissao] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [ferias, setFerias] = useState<boolean>(false);
  const [cargo, setCargo] = useState<string>("");

  useEffect(() => {
    if (usuario) {
      setDataAdmissao(usuario.dataAdmissao || null);
      setStatus(usuario.status || "");
      setFerias(!!usuario.ferias);
      setCargo(usuario.cargo || "");
    }
  }, [usuario, visible]);

  const handleSave = () => {
    onSave({
      id: usuario?.id,
      dataAdmissao,
      status,
      ferias,
      cargo,
    });
    onHide();
  };

  return (
    <Dialog
      header="Editar Funcionário"
      visible={visible}
      style={{ width: 400 }}
      onHide={onHide}
      modal
      className="funcionarios-dialog"
    >
      <div className="p-fluid">
        <div className="p-field mb-3">
          <label htmlFor="cargo">Cargo</label>
          <Dropdown
            id="cargo"
            value={cargo}
            options={cargoOptions}
            onChange={(e) => setCargo(e.value)}
            placeholder="Selecione o cargo"
            style={{ width: "100%" }}
            className="dropdown-funcionarios"
          />
        </div>
        <div className="p-field mb-3">
          <label htmlFor="dataAdmissao">Data de Admissão</label>
          {/*TODO: Adicionar localização brasileira ao calendário*/}
          <Calendar
            id="dataAdmissao"
            value={dataAdmissao ? new Date(dataAdmissao) : undefined}
            onChange={(e) =>
              setDataAdmissao(e.value ? (e.value as Date).toISOString() : null)
            }
            dateFormat="dd/mm/yy"
            showIcon
            touchUI
            locale="pt"
            style={{ width: "100%" }}
            className="theme-calendar"
          />
        </div>
        <div className="p-field mb-3">
          <label htmlFor="status">Status</label>
          <Dropdown
            id="status"
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.value)}
            placeholder="Selecione o status"
            style={{ width: "100%" }}
            className="dropdown-funcionarios"
          />
        </div>
        <div className="p-field mb-3">
          <label htmlFor="ferias">Férias</label>
          <InputSwitch
            id="ferias"
            checked={ferias}
            onChange={(e) => setFerias(e.value)}
          />
        </div>
      </div>
      <div className="p-d-flex" style={{ justifyContent: "flex-end", gap: 8 }}>
        <Button label="Cancelar" className="p-button-text" onClick={onHide} />
        <Button
          label="Salvar"
          className="p-button-success"
          onClick={handleSave}
        />
      </div>
    </Dialog>
  );
};

export default FuncionariosEdit;

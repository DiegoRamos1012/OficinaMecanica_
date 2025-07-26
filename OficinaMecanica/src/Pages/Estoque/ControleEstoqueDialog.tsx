import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { useToast } from "../../contexts/useToast";

interface ControleEstoqueDialogProps {
  visible: boolean;
  onHide: () => void;
  limiteBaixo: number;
  limiteMedio: number;
  setLimiteBaixo: (v: number) => void;
  setLimiteMedio: (v: number) => void;
}

const ControleEstoqueDialog = ({
  visible,
  onHide,
  limiteBaixo,
  limiteMedio,
  setLimiteBaixo,
  setLimiteMedio,
}: ControleEstoqueDialogProps) => {
  const [tempLimiteBaixo, setTempLimiteBaixo] = useState(limiteBaixo);
  const [tempLimiteMedio, setTempLimiteMedio] = useState(limiteMedio);
  const { showToast } = useToast();

  useEffect(() => {
    if (visible) {
      setTempLimiteBaixo(limiteBaixo);
      setTempLimiteMedio(limiteMedio);
    }
  }, [visible, limiteBaixo, limiteMedio]);

  const handleSalvarLimites = async () => {
    try {
      await api.post("/estoque/controle-estoque", {
        limite_baixo: tempLimiteBaixo,
        limite_medio: tempLimiteMedio,
      });
      setLimiteBaixo(tempLimiteBaixo);
      setLimiteMedio(tempLimiteMedio);
      showToast("Configuração de estoque salva com sucesso!");
      onHide();
      window.location.reload();
    } catch {
      showToast("Erro ao salvar configuração de estoque", "error");
      onHide();
    }
  };

  return (
    <Dialog
      header="Regras de Estoque"
      visible={visible}
      style={{ width: "400px" }}
      onHide={onHide}
      modal
      className="estoque-dialog"
    >
      <div style={{ marginBottom: 18 }}>
        <div
          style={{
            background: "var(--background-alt)",
            color: "var(--text)",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "16px",
            fontSize: "0.98rem",
          }}
        >
          Defina abaixo os limites para os status de estoque:
          <br />
          <b>Baixo</b>: Quantidade menor ou igual ao valor definido.
          <br />
          <b>Médio</b>: Quantidade maior que Baixo e menor ou igual ao valor
          definido para Médio.
          <br />
          <b>Normal</b>: Quantidade acima do valor definido para Médio.
          <br />
          Os status dos produtos na tabela serão atualizados conforme esses
          limites.
        </div>
        <div className="p-field">
          <label htmlFor="limiteBaixo">Limite para Estoque Baixo</label>
          <InputText
            id="limiteBaixo"
            type="number"
            value={tempLimiteBaixo.toString()}
            onChange={(e) =>
              setTempLimiteBaixo(Math.max(0, Number(e.target.value)))
            }
            min={0}
          />
        </div>
        <div className="p-field">
          <label htmlFor="limiteMedio">Limite para Estoque Médio</label>
          <InputText
            id="limiteMedio"
            type="number"
            value={tempLimiteMedio.toString()}
            onChange={(e) =>
              setTempLimiteMedio(
                Math.max(tempLimiteBaixo + 1, Number(e.target.value))
              )
            }
            min={tempLimiteBaixo + 1}
          />
        </div>
      </div>
      <div className="p-d-flex" style={{ justifyContent: "flex-end", gap: 8 }}>
        <Button
          label="Salvar"
          className="p-button-success"
          onClick={handleSalvarLimites}
        />
        <Button label="Fechar" className="p-button-text" onClick={onHide} />
      </div>
    </Dialog>
  );
};

export default ControleEstoqueDialog;

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../../services/api";
import type { Estoque } from "../../types/types";
import { Dialog } from "primereact/dialog";
import { formatCurrency } from "../../components/format";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown, Dropdown as PrimeDropdown } from "primereact/dropdown";
import "./EstoqueStyles.css";

const Estoque = () => {
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [newProduto, setNewProduto] = useState<
    Omit<Estoque, "id" | "criado_em" | "atualizado_em" | "deleted_at">
  >({
    nome: "",
    codigo: "",
    descricao: "",
    categoria: "",
    quantidade: 0,
    estoque_minimo: 0,
    preco_unitario: 0,
    preco_venda: 0,
    fornecedor: "",
    status: "",
    observacoes: "",
  });
  const [showExemplo, setShowExemplo] = useState(false);
  const [exemploSelecionado, setExemploSelecionado] = useState<Omit<
    Estoque,
    "id" | "criado_em" | "atualizado_em" | "deleted_at"
  > | null>(null);

  const token = localStorage.getItem("@OficinaMecanica:token");

  const categorias = [
    { label: "Óleo", value: "Óleo" },
    { label: "Filtro", value: "Filtro" },
    { label: "Peça", value: "Peça" },
    { label: "Aditivo", value: "Aditivo" },
    { label: "Pneus", value: "Pneus" },
    { label: "Bateria", value: "Bateria" },
    { label: "Ferramenta", value: "Ferramenta" },
    { label: "Elétrica", value: "Elétrica" },
    { label: "Suspensão", value: "Suspensão" },
    { label: "Freios", value: "Freios" },
    { label: "Outros", value: "Outros" },
  ];

  const exemploProdutos = [
    {
      label: "Óleo de Motor 10W40",
      value: {
        nome: "Óleo de Motor 10W40 Semissintético",
        codigo: "OLEO-10W40-01",
        descricao:
          "Lubrificante para motor semissintético 10W40 – indicado para veículos leves a gasolina ou flex.",
        categoria: "Óleo",
        quantidade: 0,
        estoque_minimo: 5,
        preco_unitario: 45.9,
        preco_venda: 69.9,
        fornecedor: "LubriMax Distribuidora LTDA",
        status: "Disponível",
        observacoes:
          "Item zerado no estoque. Reposição urgente para manutenção de serviços de troca de óleo.",
      },
    },
    {
      label: "Filtro de Óleo SpinOn",
      value: {
        nome: "Filtro de Óleo SpinOn",
        codigo: "FILTRO-OL-02",
        descricao:
          "Filtro de óleo para motores GM, linha leve, aplicação universal.",
        categoria: "Filtro",
        quantidade: 12,
        estoque_minimo: 3,
        preco_unitario: 18.5,
        preco_venda: 29.9,
        fornecedor: "AutoPeças Brasil",
        status: "Disponível",
        observacoes: "Estoque regular.",
      },
    },
    {
      label: "Aditivo Radiador Verde",
      value: {
        nome: "Aditivo Radiador Verde",
        codigo: "ADITIVO-VERDE-01",
        descricao: "Aditivo concentrado para radiador, cor verde, 1L.",
        categoria: "Aditivo",
        quantidade: 5,
        estoque_minimo: 2,
        preco_unitario: 22.0,
        preco_venda: 35.0,
        fornecedor: "Distribuidora Líquidos",
        status: "Disponível",
        observacoes: "Produto com boa saída.",
      },
    },
  ];

  const fetchEstoque = async () => {
    try {
      setLoading(true);
      const response = await api.get<Estoque[]>("/estoque");
      setEstoque(response.data);
    } catch {
      setError("Erro ao buscar produto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstoque();
  }, []);

  const priceBodyTemplate = (rowData: Estoque) => {
    return formatCurrency(rowData.preco_unitario);
  };

  const estoqueAlertaTemplate = (rowData: Estoque) => {
    if (rowData.quantidade <= 10) {
      return <span className="estoque-baixo">Baixo</span>;
    } else if (rowData.quantidade <= 20) {
      return <span className="estoque-medio">Médio</span>;
    } else {
      return <span className="estoque-normal">Normal</span>;
    }
  };

  const actionBodyTemplate = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
        />
      </div>
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setNewProduto((prev) => ({ ...prev, [id]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const num = value === "" ? 0 : Math.max(0, Number(value));
    setNewProduto((prev) => ({ ...prev, [id]: num }));
  };

  const handleSaveProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/estoque", newProduto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDialog(false);
      setNewProduto({
        nome: "",
        codigo: "",
        descricao: "",
        categoria: "",
        quantidade: 0,
        estoque_minimo: 0,
        preco_unitario: 0,
        preco_venda: 0,
        fornecedor: "",
        status: "",
        observacoes: "",
      });
      // Atualiza a lista
      const response = await api.get<Estoque[]>("/estoque");
      setEstoque(response.data);
    } catch {
      setError("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Header
          title="Controle de Estoque"
          showNewButton={true}
          newButtonLabel="Adicionar Produto"
          onNewButtonClick={() => {
            setShowDialog(true);
            fetchEstoque();
          }}
        />

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Total de Produtos" className="dashboard-card">
              <div className="text-4xl text-center">127</div>
              <div className="text-center mt-3">Itens em estoque</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Produtos com Baixo Estoque" className="dashboard-card">
              <div className="text-4xl text-center">8</div>
              <div className="text-center mt-3">Necessitam reposição</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Valor total em Estoque" className="dashboard-card">
              <div className="text-4xl text-center">R$ 24.350</div>
              <div className="text-center mt-3">Investimento atual</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Fornecedores" className="dashboard-card">
              <div className="text-4xl text-center">12</div>
              <div className="text-center mt-3">Fornecedores ativos</div>
            </Card>
          </div>
        </div>

        <div className="section-title">
          <h2>Lista de Produtos</h2>
        </div>

        <div className="card">
          <DataTable
            value={estoque}
            loading={loading}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage={error || "Nenhum produto encontrado"}
          >
            <Column
              field="codigo"
              header="Código"
              sortable
              style={{ minWidth: "100px" }}
            />
            <Column
              field="nome"
              header="Produto"
              sortable
              style={{ minWidth: "200px" }}
            />
            <Column
              field="categoria"
              header="Categoria"
              sortable
              style={{ minWidth: "150px" }}
            />
            <Column
              field="quantidade"
              header="Quantidade"
              sortable
              style={{ minWidth: "120px" }}
            />
            <Column
              field="preco_unitario"
              header="Preço"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "120px" }}
            />
            <Column
              field="fornecedor"
              header="Fornecedor"
              sortable
              style={{ minWidth: "150px" }}
            />
            <Column
              field="quantidade"
              header="Status"
              body={estoqueAlertaTemplate}
              style={{ minWidth: "120px" }}
            />
            <Column
              body={actionBodyTemplate}
              header="Ações"
              style={{ minWidth: "100px" }}
            />
          </DataTable>
        </div>

        {/* Dialog para adicionar produto */}
        <Dialog
          header="Adicione um produto ao estoque"
          visible={showDialog}
          style={{ width: "500px" }}
          onHide={() => setShowDialog(false)}
          modal
          className="estoque-dialog"
        >
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Button
              label={showExemplo ? "Ocultar Exemplo" : "Preencher Exemplo"}
              type="button"
              onClick={() => setShowExemplo((v) => !v)}
              className="p-button-info"
              style={{ minWidth: 160 }}
            />
            {showExemplo && (
              <PrimeDropdown
                value={exemploSelecionado}
                options={exemploProdutos}
                onChange={(e) => {
                  setExemploSelecionado(e.value);
                  setNewProduto(e.value);
                }}
                placeholder="Escolha um exemplo"
                style={{ minWidth: 220 }}
                optionLabel="label"
              />
            )}
          </div>

          <form onSubmit={handleSaveProduto} autoComplete="off">
            <div className="p-field">
              <label htmlFor="nome">Nome</label>
              <InputText
                id="nome"
                value={newProduto.nome}
                placeholder="Óleo de Motor 10W40 Semissintético"
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="codigo">Código</label>
              <InputText
                id="codigo"
                value={newProduto.codigo}
                placeholder="OLEO-10W40-01"
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="descricao">Descrição</label>
              <InputTextarea
                id="descricao"
                value={newProduto.descricao}
                placeholder="Lubrificante para motor semissintético 10W40 – indicado para veículos leves a gasolina ou flex."
                onChange={handleInputChange}
                autoResize
              />
            </div>
            <div className="p-field">
              <label htmlFor="categoria">Categoria</label>
              <Dropdown
                id="categoria"
                value={newProduto.categoria}
                options={categorias}
                placeholder="Lubrificantes"
                onChange={(e) =>
                  setNewProduto((prev) => ({ ...prev, categoria: e.value }))
                }
                showClear
                filter
                style={{ width: "100%" }}
                className="dropdown-estoque"
              />
            </div>
            <div className="p-field">
              <label htmlFor="quantidade">Quantidade</label>
              <InputText
                id="quantidade"
                type="number"
                value={newProduto.quantidade.toString()}
                placeholder="0"
                onChange={handleNumberChange}
                min={0}
                required
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="estoque_minimo">Estoque Mínimo</label>
              <InputText
                id="estoque_minimo"
                type="number"
                value={newProduto.estoque_minimo.toString()}
                onChange={handleNumberChange}
                min={0}
                placeholder="5"
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="preco_unitario">Preço Unitário</label>
              <InputText
                id="preco_unitario"
                type="number"
                step="0.01"
                value={newProduto.preco_unitario.toString()}
                onChange={handleNumberChange}
                min={0}
                required
                placeholder="0.00"
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="preco_venda">Preço de Venda</label>
              <InputText
                id="preco_venda"
                type="number"
                step="0.01"
                value={newProduto.preco_venda.toString()}
                onChange={handleNumberChange}
                min={0}
                placeholder="0.00"
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="fornecedor">Fornecedor</label>
              <InputText
                id="fornecedor"
                value={newProduto.fornecedor}
                onChange={handleInputChange}
                placeholder="LubriMax Distribuidora LTDA"
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="status">Status</label>
              <InputText
                id="status"
                value={newProduto.status}
                onChange={handleInputChange}
                placeholder="Disponível"
                autoComplete="off"
              />
            </div>
            <div className="p-field">
              <label htmlFor="observacoes">Observações</label>
              <InputTextarea
                id="observacoes"
                value={newProduto.observacoes}
                onChange={handleInputChange}
                autoResize
                placeholder="Item zerado no estoque. Reposição urgente para manutenção de serviços de troca de óleo."
              />
            </div>
            <div
              className="p-d-flex"
              style={{ marginTop: 16, justifyContent: "space-between" }}
            >
              <Button
                label="Cancelar"
                className="p-button-text"
                onClick={() => setShowDialog(false)}
                type="button"
              />
              <Button
                label="Salvar"
                type="submit"
                style={{ marginLeft: 200 }}
              />
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default Estoque;

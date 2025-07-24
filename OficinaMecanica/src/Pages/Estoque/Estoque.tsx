// React e hooks
import { useEffect, useState } from "react";

// PrimeReact componentes
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown, Dropdown as PrimeDropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

// Utilitários e tipos
import api from "../../services/api";
import type { Estoque } from "../../types/types";
import { formatCurrency } from "../../components/format";

// Componentes internos
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ControleEstoqueDialog from "./ControleEstoqueDialog";

// Estilos
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
  const [toastRef, setToastRef] = useState<Toast | null>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState<Estoque | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [produtoDelete, setProdutoDelete] = useState<Estoque | null>(null);
  const [showControleDialog, setShowControleDialog] = useState(false);
  const [limiteBaixo, setLimiteBaixo] = useState(10);
  const [limiteMedio, setLimiteMedio] = useState(20);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [produtosBaixoEstoque, setProdutosBaixoEstoque] = useState(0);
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [totalFornecedores, setTotalFornecedores] = useState(0);

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

  // Centraliza as chamadas de GET /estoque e GET /estoque/controle-estoque
  useEffect(() => {
    async function fetchAllEstoqueData() {
      try {
        const [respEstoque, respLimites, respBaixo] = await Promise.all([
          api.get("/estoque"),
          api.get("/estoque/controle-estoque"),
          api.get("/estoque/baixo-estoque"),
        ]);
        setEstoque(respEstoque.data);
        setTotalProdutos(respEstoque.data.length);
        setValorTotalEstoque(
          respEstoque.data.reduce(
            (acc: number, item: Estoque) =>
              acc + item.quantidade * item.preco_unitario,
            0
          )
        );
        setTotalFornecedores(
          Array.from(
            new Set(respEstoque.data.map((item: Estoque) => item.fornecedor))
          ).length
        );
        setLimiteBaixo(respLimites.data.limite_baixo);
        setLimiteMedio(respLimites.data.limite_medio);
        setProdutosBaixoEstoque(respBaixo.data.length);
      } catch {
        setEstoque([]);
        setTotalProdutos(0);
        setValorTotalEstoque(0);
        setTotalFornecedores(0);
        setLimiteBaixo(10);
        setLimiteMedio(20);
        setProdutosBaixoEstoque(0);
      }
      setLoading(false);
    }
    setLoading(true);
    fetchAllEstoqueData();
  }, []);

  const priceBodyTemplate = (rowData: Estoque) => {
    return formatCurrency(rowData.preco_unitario);
  };

  const estoqueAlertaTemplate = (rowData: Estoque) => {
    if (rowData.quantidade <= limiteBaixo) {
      return <span className="estoque-baixo">Baixo</span>;
    } else if (rowData.quantidade <= limiteMedio) {
      return <span className="estoque-medio">Médio</span>;
    } else {
      return <span className="estoque-normal">Normal</span>;
    }
  };

  const showToast = (
    msg: string,
    severity: "success" | "error" = "success"
  ) => {
    if (toastRef) {
      toastRef.show({
        severity,
        summary: severity === "success" ? "Sucesso" : "Erro",
        detail: msg,
        life: 3000,
      });
    }
  };

  const handleEditProduto = (produto: Estoque) => {
    setProdutoEdit(produto);
    setEditDialog(true);
  };

  const handleDeleteProduto = (produto: Estoque) => {
    setProdutoDelete(produto);
    setDeleteDialog(true);
  };

  const confirmDeleteProduto = async () => {
    if (!produtoDelete) return;
    try {
      setLoading(true);
      await api.delete(`/estoque/${produtoDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Produto excluído com sucesso!");
      setDeleteDialog(false);
      setProdutoDelete(null);
      fetchEstoque();
    } catch {
      showToast("Erro ao excluir produto", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produtoEdit) return;
    try {
      setLoading(true);
      await api.put(`/estoque/${produtoEdit.id}`, produtoEdit, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Produto editado com sucesso!");
      setEditDialog(false);
      setProdutoEdit(null);
      fetchEstoque();
    } catch {
      showToast("Erro ao editar produto", "error");
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Estoque) => {
    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm mr-2"
          onClick={() => handleEditProduto(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-sm"
          onClick={() => handleDeleteProduto(rowData)}
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

  const handleInputChangeEdit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setProdutoEdit((prev) => (prev ? { ...prev, [id]: value } : prev));
  };

  const handleNumberChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const num = value === "" ? 0 : Math.max(0, Number(value));
    setProdutoEdit((prev) => (prev ? { ...prev, [id]: num } : prev));
  };

  const handleSaveProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    // Object Calisthenics: Aplica early return, um recurso que evita que a função se execute se sua condição não for atendida. Melhora a legibilidade e evita processamento desnecessário
    if (!newProduto.nome) {
      showToast("Nome obrigatório", "error");
      return;
    }
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
      showToast("Produto adicionado com sucesso!");
      fetchEstoque();
    } catch {
      setError("Erro ao salvar produto");
      showToast("Erro ao salvar produto", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Toast ref={setToastRef} />
      <Sidebar />

      <div className="main-content">
        <Header
          title="Estoque"
          showNewButton={true}
          newButtonLabel="Adicionar Produto"
          onNewButtonClick={() => {
            setShowDialog(true);
            fetchEstoque();
          }}
        >
          <Button
            label="Controle de Estoque"
            className="p-button-info"
            style={{ marginLeft: 12 }}
            onClick={() => setShowControleDialog(true)}
          />
        </Header>

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Total de Produtos" className="dashboard-card">
              <div className="text-4xl text-center">{totalProdutos}</div>
              <div className="text-center mt-3">Itens em estoque</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Produtos com Baixo Estoque" className="dashboard-card">
              <div className="text-4xl text-center">{produtosBaixoEstoque}</div>
              <div className="text-center mt-3">Necessitam reposição</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Valor total em Estoque" className="dashboard-card">
              <div className="text-4xl text-center">
                R${" "}
                {valorTotalEstoque.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="text-center mt-3">Investimento atual</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Fornecedores" className="dashboard-card">
              <div className="text-4xl text-center">{totalFornecedores}</div>
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

        {/* Dialog para editar produto */}
        <Dialog
          header="Editar produto"
          visible={editDialog}
          style={{ width: "500px" }}
          onHide={() => setEditDialog(false)}
          modal
          className="estoque-dialog"
        >
          {produtoEdit && (
            <form onSubmit={handleUpdateProduto} autoComplete="off">
              <div className="p-field">
                <label htmlFor="nome">Nome</label>
                <InputText
                  id="nome"
                  value={produtoEdit.nome}
                  onChange={handleInputChangeEdit}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="codigo">Código</label>
                <InputText
                  id="codigo"
                  value={produtoEdit.codigo}
                  onChange={handleInputChangeEdit}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="descricao">Descrição</label>
                <InputTextarea
                  id="descricao"
                  value={produtoEdit.descricao}
                  onChange={handleInputChangeEdit}
                  autoResize
                />
              </div>
              <div className="p-field">
                <label htmlFor="categoria">Categoria</label>
                <Dropdown
                  id="categoria"
                  value={produtoEdit.categoria}
                  options={categorias}
                  onChange={(e) =>
                    setProdutoEdit((prev) =>
                      prev ? { ...prev, categoria: e.value } : prev
                    )
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
                  value={produtoEdit.quantidade.toString()}
                  onChange={handleNumberChangeEdit}
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
                  value={produtoEdit.estoque_minimo.toString()}
                  onChange={handleNumberChangeEdit}
                  min={0}
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="preco_unitario">Preço Unitário</label>
                <InputText
                  id="preco_unitario"
                  type="number"
                  step="0.01"
                  value={produtoEdit.preco_unitario.toString()}
                  onChange={handleNumberChangeEdit}
                  min={0}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="preco_venda">Preço de Venda</label>
                <InputText
                  id="preco_venda"
                  type="number"
                  step="0.01"
                  value={produtoEdit.preco_venda.toString()}
                  onChange={handleNumberChangeEdit}
                  min={0}
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="fornecedor">Fornecedor</label>
                <InputText
                  id="fornecedor"
                  value={produtoEdit.fornecedor}
                  onChange={handleInputChangeEdit}
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="status">Status</label>
                <InputText
                  id="status"
                  value={produtoEdit.status}
                  onChange={handleInputChangeEdit}
                  autoComplete="off"
                />
              </div>
              <div className="p-field">
                <label htmlFor="observacoes">Observações</label>
                <InputTextarea
                  id="observacoes"
                  value={produtoEdit.observacoes}
                  onChange={handleInputChangeEdit}
                  autoResize
                />
              </div>
              <div
                className="p-d-flex"
                style={{ marginTop: 16, justifyContent: "space-between" }}
              >
                <Button
                  label="Cancelar"
                  className="p-button-text"
                  onClick={() => setEditDialog(false)}
                  type="button"
                />
                <Button
                  label="Salvar"
                  type="submit"
                  style={{ marginLeft: 200 }}
                />
              </div>
            </form>
          )}
        </Dialog>

        {/* Dialog de confirmação para excluir produto */}
        <Dialog
          header="Confirmar exclusão"
          visible={deleteDialog}
          style={{ width: "400px" }}
          onHide={() => setDeleteDialog(false)}
          modal
          className="dialog-excluir"
        >
          <div style={{ marginBottom: 24, marginTop: 14 }}>
            Tem certeza que deseja excluir o produto{" "}
            <b>{produtoDelete?.nome}</b>?
          </div>
          <div className="p-d-flex" style={{ justifyContent: "flex-end" }}>
            <Button
              label="Cancelar"
              className="p-button-text"
              onClick={() => setDeleteDialog(false)}
            />
            <Button
              label="Excluir"
              className="p-button-danger"
              onClick={confirmDeleteProduto}
              style={{ marginLeft: 16 }}
            />
          </div>
        </Dialog>

        {/* Dialog para controle de estoque */}
        <ControleEstoqueDialog
          visible={showControleDialog}
          onHide={() => setShowControleDialog(false)}
          limiteBaixo={limiteBaixo}
          limiteMedio={limiteMedio}
          setLimiteBaixo={setLimiteBaixo}
          setLimiteMedio={setLimiteMedio}
          showToast={showToast}
        />
      </div>
    </div>
  );
};

export default Estoque;

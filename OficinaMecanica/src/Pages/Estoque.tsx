import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Estoque } from "../types/types";

const Estoque = () => {
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
    fetchEstoque();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

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

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Header
          title="Controle de Estoque"
          showNewButton={true}
          newButtonLabel="Adicionar Produto"
          onNewButtonClick={handleAddProduct}
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
      </div>
    </div>
  );
};

export default Estoque;

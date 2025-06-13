import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  quantidade: number;
  precoUnitario: number;
  fornecedor: string;
}

const Estoque = () => {
  const handleAddProduct = () => {
    // Implementação futura para adicionar produto
    console.log("Adicionar novo produto");
  };

  // Dados de exemplo para o estoque
  const produtos = [
    {
      id: 1,
      codigo: "P001",
      nome: "Óleo de Motor 5W30",
      categoria: "Lubrificantes",
      quantidade: 45,
      precoUnitario: 35.9,
      fornecedor: "Distribuidora ABC",
    },
    {
      id: 2,
      codigo: "P002",
      nome: "Filtro de Óleo",
      categoria: "Filtros",
      quantidade: 32,
      precoUnitario: 18.5,
      fornecedor: "Auto Peças XYZ",
    },
    {
      id: 3,
      codigo: "P003",
      nome: "Pastilha de Freio",
      categoria: "Freios",
      quantidade: 12,
      precoUnitario: 65.0,
      fornecedor: "Freios Master",
    },
    {
      id: 4,
      codigo: "P004",
      nome: "Bateria 60Ah",
      categoria: "Elétrica",
      quantidade: 8,
      precoUnitario: 350.0,
      fornecedor: "Baterias Power",
    },
    {
      id: 5,
      codigo: "P005",
      nome: "Lâmpada Farol",
      categoria: "Elétrica",
      quantidade: 20,
      precoUnitario: 15.9,
      fornecedor: "Auto Peças XYZ",
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const priceBodyTemplate = (rowData: Produto) => {
    return formatCurrency(rowData.precoUnitario);
  };

  const estoqueAlertaTemplate = (rowData: Produto) => {
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
            value={produtos}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage="Nenhum produto encontrado"
          >
            <Column
              field="codigo"
              header="Código"
              sortable
              style={{ minWidth: "100px" }}
            ></Column>
            <Column
              field="nome"
              header="Produto"
              sortable
              style={{ minWidth: "200px" }}
            ></Column>
            <Column
              field="categoria"
              header="Categoria"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="quantidade"
              header="Quantidade"
              sortable
              style={{ minWidth: "120px" }}
            ></Column>
            <Column
              field="precoUnitario"
              header="Preço"
              body={priceBodyTemplate}
              sortable
              style={{ minWidth: "120px" }}
            ></Column>
            <Column
              field="fornecedor"
              header="Fornecedor"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="quantidade"
              header="Status"
              body={estoqueAlertaTemplate}
              style={{ minWidth: "120px" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              header="Ações"
              style={{ minWidth: "100px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Estoque;

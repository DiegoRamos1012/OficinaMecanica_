import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { Funcionario } from "../types/types";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Funcionarios = () => {

  const handleNewEmployee = () => {
    // Implementação futura para criar novo funcionário
    console.log("Criar novo funcionário");
  };

  // Dados de exemplo para funcionários
  const funcionarios: Funcionario[] = [
    {
      id: 1,
      nome: "Carlos Silva",
      cargo: "Mecânico",
      departamento: "Oficina",
      dataAdmissao: "15/03/2019",
      status: "Ativo",
      telefone: "(11) 98765-4321",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      cargo: "Atendente",
      departamento: "Recepção",
      dataAdmissao: "22/08/2020",
      status: "Ativo",
      telefone: "(11) 97654-3210",
    },
    {
      id: 3,
      nome: "João Ferreira",
      cargo: "Mecânico Chefe",
      departamento: "Oficina",
      dataAdmissao: "05/12/2017",
      status: "Ativo",
      telefone: "(11) 96543-2109",
    },
    {
      id: 4,
      nome: "Ana Santos",
      cargo: "Gerente",
      departamento: "Administração",
      dataAdmissao: "10/01/2018",
      status: "Ativo",
      telefone: "(11) 95432-1098",
    },
    {
      id: 5,
      nome: "Pedro Costa",
      cargo: "Auxiliar Mecânico",
      departamento: "Oficina",
      dataAdmissao: "28/05/2021",
      status: "Férias",
      telefone: "(11) 94321-0987",
    },
  ];

  const cargoBodyTemplate = (rowData: Funcionario) => {
    return <>{rowData.cargo}</>;
  };

  const statusBodyTemplate = (rowData: Funcionario) => {
    const statusSeverity =
      rowData.status === "Ativo"
        ? "success"
        : rowData.status === "Férias"
        ? "warning"
        : "danger";

    return <Tag value={rowData.status} severity={statusSeverity} />;
  };

  const actionBodyTemplate = () => {
    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm mr-2"
        />
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
          title="Gestão de Funcionários"
          showNewButton={true}
          newButtonLabel="Novo Funcionário"
          onNewButtonClick={handleNewEmployee}
        />

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Total de Funcionários" className="dashboard-card">
              <div className="text-4xl text-center">15</div>
              <div className="text-center mt-3">Equipe completa</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Mecânicos" className="dashboard-card">
              <div className="text-4xl text-center">8</div>
              <div className="text-center mt-3">Profissionais técnicos</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Administrativo" className="dashboard-card">
              <div className="text-4xl text-center">5</div>
              <div className="text-center mt-3">Suporte e gestão</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Em Férias" className="dashboard-card">
              <div className="text-4xl text-center">2</div>
              <div className="text-center mt-3">Ausentes temporariamente</div>
            </Card>
          </div>
        </div>

        <div className="section-title">
          <h2>Lista de Funcionários</h2>
        </div>

        <div className="card">
          <DataTable
            value={funcionarios}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage="Nenhum funcionário encontrado"
          >
            <Column
              field="nome"
              header="Nome"
              sortable
              style={{ minWidth: "200px" }}
            ></Column>
            <Column
              field="cargo"
              header="Cargo"
              body={cargoBodyTemplate}
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="departamento"
              header="Departamento"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="dataAdmissao"
              header="Data de Admissão"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="telefone"
              header="Telefone"
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "120px" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              header="Ações"
              style={{ minWidth: "150px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Funcionarios;

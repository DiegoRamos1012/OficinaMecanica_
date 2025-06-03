import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { AuthContext } from "../contexts/AuthContext";
import type { Cliente } from "../types/types";
import Header from "../components/Header";

const Clientes = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNewClient = () => {
    // Implementação futura para criar novo cliente
    console.log("Criar novo cliente");
  };

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/dashboard"),
    },
    {
      label: "Estoque",
      icon: "pi pi-box",
      command: () => navigate("/estoque"),
    },
    {
      label: "Funcionários",
      icon: "pi pi-users",
      command: () => navigate("/funcionarios"),
    },
    {
      label: "Clientes",
      icon: "pi pi-user",
      command: () => navigate("/clientes"),
    },
    {
      label: "Veículos",
      icon: "pi pi-car",
      command: () => navigate("/veiculos"),
    },
    {
      label: "Serviços",
      icon: "pi pi-wrench",
      command: () => navigate("/servicos"),
    },
    {
      label: "Relatórios",
      icon: "pi pi-chart-bar",
      command: () => navigate("/relatorios"),
    },
    {
      separator: true,
    },
    {
      label: "Configurações",
      icon: "pi pi-cog",
      command: () => navigate("/settings"),
    },
    {
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogout,
    },
  ];

  // Dados de exemplo para clientes
  const clientes: Cliente[] = [
    {
      id: 1,
      nome: "Roberto Almeida",
      email: "roberto.almeida@email.com",
      telefone: "(11) 98877-6655",
      dataCadastro: "10/02/2020",
      qtdVeiculos: 2,
      ultimaVisita: "15/10/2023",
    },
    {
      id: 2,
      nome: "Carla Mendes",
      email: "carla.mendes@email.com",
      telefone: "(11) 97766-5544",
      dataCadastro: "25/05/2021",
      qtdVeiculos: 1,
      ultimaVisita: "03/11/2023",
    },
    {
      id: 3,
      nome: "Paulo Ribeiro",
      email: "paulo.ribeiro@email.com",
      telefone: "(11) 96655-4433",
      dataCadastro: "18/11/2019",
      qtdVeiculos: 3,
      ultimaVisita: "27/09/2023",
    },
    {
      id: 4,
      nome: "Juliana Castro",
      email: "juliana.castro@email.com",
      telefone: "(11) 95544-3322",
      dataCadastro: "05/09/2022",
      qtdVeiculos: 1,
      ultimaVisita: "12/11/2023",
    },
    {
      id: 5,
      nome: "Ricardo Souza",
      email: "ricardo.souza@email.com",
      telefone: "(11) 94433-2211",
      dataCadastro: "30/03/2020",
      qtdVeiculos: 2,
      ultimaVisita: "08/10/2023",
    },
  ];

  const veiculosBodyTemplate = (rowData: Cliente) => {
    return (
      <div className="flex align-items-center">
        <Badge value={rowData.qtdVeiculos} severity="info" />
      </div>
    );
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
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Auto Repair Shop</h2>
        </div>
        <Menu model={menuItems} className="sidebar-menu" />
      </div>

      <div className="main-content">
        <Header
          title="Gerenciamento de Clientes"
          showNewButton={true}
          newButtonLabel="Novo Cliente"
          onNewButtonClick={handleNewClient}
        />

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Total de Clientes" className="dashboard-card">
              <div className="text-4xl text-center">28</div>
              <div className="text-center mt-3">Clientes cadastrados</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Novos Clientes" className="dashboard-card">
              <div className="text-4xl text-center">5</div>
              <div className="text-center mt-3">Últimos 30 dias</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Clientes Recorrentes" className="dashboard-card">
              <div className="text-4xl text-center">18</div>
              <div className="text-center mt-3">Mais de 1 visita</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Veículos por Cliente" className="dashboard-card">
              <div className="text-4xl text-center">1.6</div>
              <div className="text-center mt-3">Média geral</div>
            </Card>
          </div>
        </div>

        <div className="section-title">
          <h2>Lista de Clientes</h2>
        </div>

        <div className="card">
          <DataTable
            value={clientes}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage="Nenhum cliente encontrado"
          >
            <Column
              field="nome"
              header="Nome"
              sortable
              style={{ minWidth: "200px" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "200px" }}
            ></Column>
            <Column
              field="telefone"
              header="Telefone"
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="dataCadastro"
              header="Data de Cadastro"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="ultimaVisita"
              header="Última Visita"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="qtdVeiculos"
              header="Veículos"
              body={veiculosBodyTemplate}
              sortable
              style={{ minWidth: "100px" }}
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

export default Clientes;

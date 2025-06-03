import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Tag } from "primereact/tag";
import { AuthContext } from "../contexts/AuthContext";
import type { Veiculo } from "../types/types";

const Veiculos = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      label: "Sair",
      icon: "pi pi-sign-out",
      command: handleLogout,
    },
  ];

  // Dados de exemplo para veículos
  const veiculos: Veiculo[] = [
    {
      id: 1,
      placa: "ABC-1234",
      modelo: "Gol",
      marca: "Volkswagen",
      ano: 2018,
      proprietario: "Roberto Almeida",
      status: "Em Manutenção",
      ultimaManutencao: "15/11/2023",
    },
    {
      id: 2,
      placa: "DEF-5678",
      modelo: "Civic",
      marca: "Honda",
      ano: 2020,
      proprietario: "Carla Mendes",
      status: "OK",
      ultimaManutencao: "03/10/2023",
    },
    {
      id: 3,
      placa: "GHI-9012",
      modelo: "Corolla",
      marca: "Toyota",
      ano: 2019,
      proprietario: "Paulo Ribeiro",
      status: "Em Manutenção",
      ultimaManutencao: "20/11/2023",
    },
    {
      id: 4,
      placa: "JKL-3456",
      modelo: "HB20",
      marca: "Hyundai",
      ano: 2021,
      proprietario: "Juliana Castro",
      status: "OK",
      ultimaManutencao: "05/09/2023",
    },
    {
      id: 5,
      placa: "MNO-7890",
      modelo: "Kicks",
      marca: "Nissan",
      ano: 2020,
      proprietario: "Ricardo Souza",
      status: "Agendado",
      ultimaManutencao: "10/12/2023",
    },
  ];

  const statusBodyTemplate = (rowData: Veiculo) => {
    const statusSeverity =
      rowData.status === "OK"
        ? "success"
        : rowData.status === "Em Manutenção"
        ? "warning"
        : "info";

    return <Tag value={rowData.status} severity={statusSeverity} />;
  };

  const actionBodyTemplate = (rowData: Veiculo) => {
    const handleViewHistory = () => {
      console.log(`Ver histórico do veículo: ${rowData.placa}`);
      // Implementar navegação ou modal para mostrar histórico
    };

    const handleEditVehicle = () => {
      console.log(`Editar veículo: ${rowData.placa}`);
      // Implementar navegação para página de edição
    };

    const handleScheduleService = () => {
      console.log(`Agendar serviço para: ${rowData.placa} - ${rowData.modelo}`);
      // Implementar agendamento de serviço
    };

    return (
      <div className="action-buttons">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-sm mr-2"
          tooltip="Ver histórico"
          onClick={handleViewHistory}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-button-sm mr-2"
          tooltip="Editar veículo"
          onClick={handleEditVehicle}
        />
        <Button
          icon="pi pi-calendar-plus"
          className="p-button-rounded p-button-warning p-button-sm"
          tooltip="Agendar serviço"
          onClick={handleScheduleService}
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
        <div className="content-header">
          <h1 className="content-title">Controle de Veículos</h1>
          <div>
            <Button
              label="Novo Veículo"
              icon="pi pi-plus"
              className="p-button-success mr-2"
            />
            <Button
              icon="pi pi-sign-out"
              label="Logout"
              onClick={handleLogout}
              className="p-button-danger"
            />
          </div>
        </div>

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Total de Veículos" className="dashboard-card">
              <div className="text-4xl text-center">45</div>
              <div className="text-center mt-3">Veículos cadastrados</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Em Manutenção" className="dashboard-card">
              <div className="text-4xl text-center">8</div>
              <div className="text-center mt-3">Sendo atendidos</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Agendados" className="dashboard-card">
              <div className="text-4xl text-center">12</div>
              <div className="text-center mt-3">Para próximos dias</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Idade Média" className="dashboard-card">
              <div className="text-4xl text-center">5.3</div>
              <div className="text-center mt-3">Anos por veículo</div>
            </Card>
          </div>
        </div>

        <div className="section-title">
          <h2>Lista de Veículos</h2>
        </div>

        <div className="card">
          <DataTable
            value={veiculos}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            responsiveLayout="stack"
            breakpoint="960px"
            emptyMessage="Nenhum veículo encontrado"
          >
            <Column
              field="placa"
              header="Placa"
              sortable
              style={{ minWidth: "100px" }}
            ></Column>
            <Column
              field="modelo"
              header="Modelo"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="marca"
              header="Marca"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="ano"
              header="Ano"
              sortable
              style={{ minWidth: "100px" }}
            ></Column>
            <Column
              field="proprietario"
              header="Proprietário"
              sortable
              style={{ minWidth: "200px" }}
            ></Column>
            <Column
              field="ultimaManutencao"
              header="Última Manutenção"
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              style={{ minWidth: "150px" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              header="Ações"
              style={{ minWidth: "180px" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Veiculos;

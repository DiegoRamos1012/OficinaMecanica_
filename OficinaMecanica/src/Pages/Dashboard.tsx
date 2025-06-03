import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";

const Dashboard = () => {
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

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Auto Repair Shop</h2>
        </div>
        <Menu model={menuItems} className="sidebar-menu" />
      </div>

      <div className="main-content">
        <Header title="Dashboard" />

        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Serviços Ativos" className="dashboard-card">
              <div className="text-4xl text-center">12</div>
              <div className="text-center mt-3">Serviços em andamento</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Veículos" className="dashboard-card">
              <div className="text-4xl text-center">45</div>
              <div className="text-center mt-3">Veículos cadastrados</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Clientes" className="dashboard-card">
              <div className="text-4xl text-center">28</div>
              <div className="text-center mt-3">Clientes ativos</div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <Card title="Faturamento" className="dashboard-card">
              <div className="text-4xl text-center">R$ 4.250</div>
              <div className="text-center mt-3">Receita mensal</div>
            </Card>
          </div>
        </div>

        <div className="section-title">
          <h2>Atividades Recentes</h2>
        </div>

        <div className="mt-4">
          <Card title="Serviços Recentes" className="dashboard-card">
            <p>Aqui você verá uma tabela de serviços recentes...</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

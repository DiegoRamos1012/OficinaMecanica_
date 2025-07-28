import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
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
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Oficina Mecânica</h2>
      </div>
      <Menu model={menuItems} className="sidebar-menu" />
    </div>
  );
};

export default Sidebar;

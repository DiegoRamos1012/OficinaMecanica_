import { Card } from "primereact/card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="app-container">
      <Sidebar />

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

import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import "./FuncionariosStyles.css";
import { formatDate } from "../../utils/format";
import { User } from "../../types/types"

// Novo tipo para refletir o usuário

const Funcionarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<User[]>("/usuarios");
        setUsuarios(response.data);
      } catch (err) {
        console.error("[Funcionarios] Erro ao carregar usuários:", err);
        setError("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const dataAdmissaoBody = (rowData: User) => {
    return rowData.dataAdmissao ? formatDate(rowData.dataAdmissao) : "-";
  };

  const statusBodyTemplate = (rowData: User) => {
    const status = rowData.status || "";
    const statusSeverity =
      status.toLowerCase() === "ativo"
        ? "success"
        : status.toLowerCase() === "férias"
        ? "warning"
        : "danger";
    return <Tag value={status} severity={statusSeverity} />;
  };

  const feriasBodyTemplate = (rowData: User) => {
    return rowData.ferias ? (
      <Tag value="Sim" severity="warning" />
    ) : (
      <Tag value="Não" severity="success" />
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

  // Cálculo dinâmico dos cards
  const totalFuncionarios = usuarios.length;
  const totalMecanicos = usuarios.filter((u) =>
    u.cargo?.toLowerCase().includes("mecanic")
  ).length;
  const totalAdministrativo = usuarios.filter((u) =>
    u.cargo?.toLowerCase().includes("admin")
  ).length;
  const totalFerias = usuarios.filter((u) => u.ferias).length;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header
          title="Gestão de Funcionários"
          showNewButton={true}
          newButtonLabel="Novo Funcionário"
          onNewButtonClick={() => {}}
        />
        {loading ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            Carregando funcionários...
          </div>
        ) : error ? (
          <div
            style={{
              color: "red",
              textAlign: "center",
              margin: "2rem",
            }}
          >
            {error}
          </div>
        ) : (
          <>
            <div className="grid">
              <div className="col-12 md:col-6 lg:col-3">
                <Card title="Total de Funcionários" className="dashboard-card">
                  <div className="text-4xl text-center">
                    {totalFuncionarios}
                  </div>
                  <div className="text-center mt-3">Equipe completa</div>
                </Card>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <Card title="Mecânicos" className="dashboard-card">
                  <div className="text-4xl text-center">{totalMecanicos}</div>
                  <div className="text-center mt-3">Profissionais técnicos</div>
                </Card>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <Card title="Administrativo" className="dashboard-card">
                  <div className="text-4xl text-center">
                    {totalAdministrativo}
                  </div>
                  <div className="text-center mt-3">Suporte e gestão</div>
                </Card>
              </div>
              <div className="col-12 md:col-6 lg:col-3">
                <Card title="Em Férias" className="dashboard-card">
                  <div className="text-4xl text-center">{totalFerias}</div>
                  <div className="text-center mt-3">
                    Ausentes temporariamente
                  </div>
                </Card>
              </div>
            </div>

            <div className="section-title">
              <h2>Lista de Funcionários</h2>
            </div>

            <div className="card">
              <DataTable
                value={usuarios}
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
                  style={{ minWidth: "180px" }}
                />
                <Column
                  field="email"
                  header="Email"
                  sortable
                  style={{ minWidth: "180px" }}
                />
                <Column
                  field="cargo"
                  header="Cargo"
                  sortable
                  style={{ minWidth: "120px" }}
                />
                <Column
                  field="dataAdmissao"
                  header="Data de Admissão"
                  body={dataAdmissaoBody}
                  sortable
                  style={{ minWidth: "140px" }}
                />
                <Column
                  field="status"
                  header="Status"
                  body={statusBodyTemplate}
                  sortable
                  style={{ minWidth: "120px" }}
                />
                <Column
                  field="ferias"
                  header="Férias"
                  body={feriasBodyTemplate}
                  sortable
                  style={{ minWidth: "100px" }}
                />
                <Column
                  body={actionBodyTemplate}
                  header="Ações"
                  style={{ minWidth: "150px" }}
                />
              </DataTable>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Funcionarios;

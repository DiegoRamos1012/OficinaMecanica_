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
import { User } from "../../types/types";
import FuncionariosEdit from "./FuncionariosEdit";
import FuncionariosView from "./FuncionarioView";
import { Tooltip } from "primereact/tooltip";
import FuncionariosDelete from "./FuncionariosDelete";

const Funcionarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("@OficinaMecanica:token");
        const response = await api.get<User[]>("/usuarios", {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        setUsuarios(response.data);
      } catch {
        setError("Erro ao carregar usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleEditUsuario = (usuario: User) => {
    setUsuarioSelecionado(usuario);
    setShowEditDialog(true);
  };

  const handleViewUsuario = (usuario: User) => {
    setUsuarioSelecionado(usuario);
    setShowViewDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setUsuarioSelecionado(null);
  };

  const handleDeleteUsuario = async (id: number) => {
    setLoadingDelete(true);
    try {
      const token = localStorage.getItem("@OficinaMecanica:token");
      await api.delete(`/usuarios/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const response = await api.get<User[]>("/usuarios", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setUsuarios(response.data);
      setShowDeleteDialog(false);
      setUsuarioSelecionado(null);
    } catch {
      setError("Erro ao excluir usuário.");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSaveUsuario = async (dados: Partial<User>) => {
    if (!dados.id) return;
    try {
      const token = localStorage.getItem("@OficinaMecanica:token");
      await api.put(`/usuarios/${dados.id}`, dados, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const response = await api.get<User[]>("/usuarios", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      setUsuarios(response.data);
    } catch {
      setError("Erro ao salvar usuário.");
    }
  };

  const dataAdmissaoBody = (rowData: User) => {
    if (!rowData.dataAdmissao) return "-";
    const date = new Date(rowData.dataAdmissao);
    return formatDate(date);
  };

  const statusBodyTemplate = (rowData: User) => {
    const status = rowData.status || "";
    let statusSeverity: "success" | "danger" | "warning" = "danger";
    switch (status.toLowerCase()) {
      case "ativo":
        statusSeverity = "success";
        break;
      case "em treinamento":
        statusSeverity = "warning";
        break;
      case "inativo":
        statusSeverity = "danger";
        break;
      default:
        statusSeverity = "danger";
    }
    return <Tag value={status} severity={statusSeverity} />;
  };

  const feriasBodyTemplate = (rowData: User) =>
    rowData.ferias ? (
      <Tag value="Sim" severity="warning" />
    ) : (
      <Tag value="Não" severity="success" />
    );

  const actionBodyTemplate = (rowData: User) => (
    <div className="action-buttons">
      <Tooltip
        target=".btnViewFuncionario, .btnEditFuncionario, .btnDeleteFuncionario"
        position="top"
        className="p-tooltip"
      />
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-info p-button-sm mr-2 btnViewFuncionario"
        onClick={() => handleViewUsuario(rowData)}
        data-pr-tooltip="Visualizar detalhes do funcionário"
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-button-sm mr-2 btnEditFuncionario"
        onClick={() => handleEditUsuario(rowData)}
        data-pr-tooltip="Editar dados do funcionário"
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-sm btnDeleteFuncionario"
        onClick={() => {
          setUsuarioSelecionado(rowData);
          setShowDeleteDialog(true);
        }}
        data-pr-tooltip="Deletar Funcionário"
      />
    </div>
  );

  // Cards resumo
  const totalFuncionarios = usuarios.length;
  const totalMecanicos = usuarios.filter((u) =>
    u.cargo?.toLowerCase().includes("mecânico")
  ).length;
  const totalAdministrativo = usuarios.filter((u) =>
    u.cargo?.toLowerCase().includes("administrativo")
  ).length;
  const totalFerias = usuarios.filter((u) => u.ferias).length;

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title="Gestão de Funcionários" />
        {loading ? (
          <div style={{ textAlign: "center", margin: "2rem" }}>
            Carregando funcionários...
          </div>
        ) : error ? (
          <div style={{ color: "red", textAlign: "center", margin: "2rem" }}>
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
        <FuncionariosEdit
          visible={showEditDialog}
          onHide={() => setShowEditDialog(false)}
          usuario={usuarioSelecionado}
          onSave={handleSaveUsuario}
        />
        <FuncionariosView
          visible={showViewDialog}
          onHide={() => setShowViewDialog(false)}
          usuario={usuarioSelecionado}
          onSave={handleSaveUsuario}
        />
        <FuncionariosDelete
          visible={showDeleteDialog}
          usuario={usuarioSelecionado ?? undefined}
          onHide={handleCloseDeleteDialog}
          onDelete={handleDeleteUsuario}
          loading={loadingDelete}
        />
      </div>
    </div>
  );
};

export default Funcionarios;

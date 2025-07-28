import { useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

interface HeaderProps {
  title: string;
  showNewButton?: boolean;
  newButtonLabel?: string;
  onNewButtonClick?: () => void;
  children?: React.ReactNode;
}

const Header = ({
  title,
  showNewButton = false,
  newButtonLabel = "Novo",
  onNewButtonClick,
  children,
}: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Memoriza a baseURL para evitar recálculo
  const baseURL = useMemo(
    () => api.defaults.baseURL?.replace(/\/api$/, "") || "",
    []
  );

  // Memoriza o renderAvatar para evitar recriação
  const renderAvatar = useCallback(() => {
    const avatarStyle = { width: "40px", height: "40px" };
    if (user?.avatar && user.avatar !== "[]") {
      return (
        <Avatar
          image={`${baseURL}/${user.avatar.replace(/^\/?/, "")}`}
          shape="circle"
          style={avatarStyle}
          className="header-avatar"
        />
      );
    } else {
      return (
        <Avatar
          icon="pi pi-user"
          size="large"
          style={{
            ...avatarStyle,
            backgroundColor: "var(--surface-border)",
            color: "#ffffff",
          }}
          shape="circle"
          className="header-avatar"
        />
      );
    }
  }, [user, baseURL]);

  return (
    <div className="content-header">
      <h1 className="content-title">{title}</h1>
      <div className="header-actions">
        {showNewButton && (
          <Button
            label={newButtonLabel}
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={onNewButtonClick}
          />
        )}
        {children}
        <div className="user-profile" onClick={() => navigate("/settings")}>
          <span className="user-name mr-2">
            {user?.nome || "Admin Usuário"}
          </span>
          {renderAvatar()}
        </div>
      </div>
    </div>
  );
};

export default Header;

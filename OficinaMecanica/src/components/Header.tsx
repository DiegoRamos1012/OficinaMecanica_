import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { AuthContext } from "../contexts/AuthContext";

interface HeaderProps {
  title: string;
  showNewButton?: boolean;
  newButtonLabel?: string;
  onNewButtonClick?: () => void;
}

const Header = ({
  title,
  showNewButton = false,
  newButtonLabel = "Novo",
  onNewButtonClick,
}: HeaderProps) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

        <div className="user-profile" onClick={() => navigate("/settings")}>
          <span className="user-name mr-2">
            {user?.name || "Admin Usuário"}
          </span>
          <Avatar
            image={
              user?.profileImage || "/src/assets/images/default-avatar.png"
            }
            shape="circle"
            className="header-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

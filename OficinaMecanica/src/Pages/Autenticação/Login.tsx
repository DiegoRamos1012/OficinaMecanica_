import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useAuth } from "../../hooks/useAuth";
import { Toast } from "primereact/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      toast.current?.show({
        severity: "success",
        summary: "Login realizado",
        detail: "Bem-vindo!",
        life: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro no login",
        detail: "Email ou senha incorretos",
        life: 3000,
      });
      setErrorMessage("Email ou senha incorretos");
    }
  };

  const handleDirectAccess = async () => {
    const success = await login("example@999.com", "admin123");

    if (success) {
      toast.current?.show({
        severity: "success",
        summary: "Login realizado",
        detail: "Bem-vindo!",
        life: 2000,
      });
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro no acesso direto",
        detail: "Contate o administrador.",
        life: 3000,
      });
      setErrorMessage("Erro no acesso direto. Contate o administrador.");
    }
  };

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <Card className="login-card">
        <div className="login-logo"></div>
        <h2 className="p-card-title">Oficina Mecânica Tralalero Tralala</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              promptLabel="Digite uma senha"
              weakLabel="Senha fraca"
              mediumLabel="Segurança média"
              strongLabel="Senha ideal"
              toggleMask
              feedback={false}
              required
            />
          </div>

          {errorMessage && <div className="login-error">{errorMessage}</div>}

          <Button type="submit" label="Entrar" />

          {/* Botão provisório para acesso direto com autenticação */}
          <Button
            type="button"
            label="Acesso Direto (Provisório)"
            onClick={handleDirectAccess}
            className="p-button-warning direct-access-button"
          />

          <div className="register-link">
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </div>
        </form>

        <div className="login-footer">
          © {new Date().getFullYear()} Diego Ramos dos Santos
        </div>
      </Card>
    </div>
  );
};

export default Login;

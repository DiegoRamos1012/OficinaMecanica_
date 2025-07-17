import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Usando a nova tipagem do método login (apenas email e senha)
    const success = await login(email, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setErrorMessage("Email ou senha incorretos");
    }
  };

  // Função para entrar diretamente, com autenticação
  const handleDirectAccess = async () => {
    // Autenticar com valores padrão antes de navegar
    // Usando a nova tipagem do método login (apenas email e senha)
    const success = await login("example@999.com", "admin123");

    if (success) {
      navigate("/dashboard");
    } else {
      setErrorMessage("Erro no acesso direto. Contate o administrador.");
    }
  };

  return (
    <div className="login-container">
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

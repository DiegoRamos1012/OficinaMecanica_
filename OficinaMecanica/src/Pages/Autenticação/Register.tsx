import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useRef<Toast>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      toast.current?.show({
        severity: "error",
        summary: "Erro no cadastro",
        detail: "As senhas não coincidem",
        life: 3000,
      });
      return;
    }

    try {
      const success = await register(username, email, password);

      if (success) {
        toast.current?.show({
          severity: "success",
          summary: "Cadastro realizado",
          detail: "Conta criada com sucesso!",
          life: 2000,
        });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setErrorMessage("Erro ao registrar. Tente novamente.");
        toast.current?.show({
          severity: "error",
          summary: "Erro no cadastro",
          detail: "Erro ao registrar. Tente novamente.",
          life: 3000,
        });
      }
    } catch {
      setErrorMessage("Erro ao registrar. Tente novamente.");
      toast.current?.show({
        severity: "error",
        summary: "Erro no cadastro",
        detail: "Erro ao registrar. Tente novamente.",
        life: 3000,
      });
    }
  };

  return (
    <div className="register-container">
      <Toast ref={toast} />
      <Card className="register-card">
        <div className="register-logo"></div>
        <h2 className="p-card-title">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="field">
            <label htmlFor="username">Nome de Usuário</label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              type="email"
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
              feedback={true}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <Password
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
              feedback={false}
              required
            />
          </div>
          {errorMessage && <div className="register-error">{errorMessage}</div>}
          <Button type="submit" label="Cadastrar-se" />
          <div className="login-link">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
        </form>
        <div className="register-footer">
          © {new Date().getFullYear()} Diego Ramos dos Santos
        </div>
      </Card>
    </div>
  );
};

export default Register;

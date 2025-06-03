import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // Aqui precisamos assumir que existe um método register no AuthContext
  // Esta função deve ser implementada no contexto de autenticação
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de senha
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    // Simular registro (isto deve ser modificado para chamar uma API real)
    try {
      // Aqui deveria ser chamada uma API para registro
      // Por enquanto, vamos apenas fazer login após o registro
      const success = register(username, email, password);

      if (success) {
        navigate("/dashboard");
      } else {
        setErrorMessage("Erro ao registrar. Tente novamente.");
      }
    } catch {
      setErrorMessage("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="register-container">
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

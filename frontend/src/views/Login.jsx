import React, { useState, useContext } from "react";
import { Context } from "../js/store/appContext.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const { actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actions.login(username, password);
    if (result && result.access_token) {
      navigate("/");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ background: "#fffbe7" }}>
      <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 24px #c0a16b" }}>
        <h2 className="mb-4" style={{ color: "#6f4e37" }}>Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-lg" style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
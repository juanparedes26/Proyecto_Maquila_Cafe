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
      <div style={{ background: "#fff", padding: "32px", borderRadius: "18px", boxShadow: "0 4px 24px #c0a16b", minWidth: "340px" }}>
        <div className="text-center mb-3">
          <i className="bi bi-person-circle" style={{ fontSize: "3rem", color: "#c0a16b" }}></i>
        </div>
        <h2 className="mb-2 text-center" style={{ color: "#6f4e37" }}>Bienvenido</h2>
        <p className="text-center" style={{ color: "#b97a56" }}>Por favor, inicia sesión para continuar</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="form-label" style={{ color: "#6f4e37" }}>Usuario</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label className="form-label" style={{ color: "#6f4e37" }}>Contraseña</label>
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-lg d-flex align-items-center gap-2 w-100 justify-content-center"
            style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}>
            <i className="bi bi-box-arrow-in-right"></i> Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
import React, { useContext } from "react";
import { Context } from "../js/store/appContext.jsx";
import { Link, useNavigate } from "react-router-dom";

const navbarStyle = {
  background: "#6f4e37",
  borderBottom: "3px solid #c0a16b",
  boxShadow: "0 2px 12px #c0a16b33"
};

const linkStyle = {
  color: "#fffbe7",
  fontWeight: "bold",
  marginRight: "15px",
  borderRadius: "2rem",
  padding: "0.5rem 1.2rem",
  transition: "background 0.2s, color 0.2s"
};

const brandStyle = {
  color: "#fffbe7",
  fontWeight: "bold",
  fontSize: "1.5rem",
  letterSpacing: "2px",
  textShadow: "2px 2px 10px #4b2e19, 0 0 8px #000",
  display: "flex",
  alignItems: "center",
  gap: "10px"
};

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" style={brandStyle}>
          
          Maquilas Don Andres
           <i className="bi bi-cup-hot" style={{ fontSize: "2rem", color: "#c0a16b" }}></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link rounded-pill px-3 d-flex align-items-center gap-2" to="/" style={linkStyle}>
                <i className="bi bi-house-door"></i> Inicio
              </Link>
            </li>
            {store.token && (
              <li className="nav-item">
                <Link className="nav-link rounded-pill px-3 d-flex align-items-center gap-2" to="/clientes" style={linkStyle}>
                  <i className="bi bi-people"></i> Clientes
                </Link>
              </li>
            )}
            {store.token ? (
              <li className="nav-item">
               <button
                    className="btn d-flex align-items-center gap-2"
                    style={{
                        background: "transparent",
                        color: "#fffbe7",
                        fontWeight: "bold",
                        borderRadius: "2rem",
                        border: "none",
                        padding: "0.5rem 1.2rem"
                    }}
                    onClick={handleLogout}
                    >
                    <i className="bi bi-box-arrow-right"></i> Cerrar sesión
            </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link rounded-pill px-3 d-flex align-items-center gap-2" to="/login" style={linkStyle}>
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
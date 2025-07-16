import { Link } from "react-router-dom";

const navbarStyle = {
  background: "#6f4e37", 
  borderBottom: "3px solid #c0a16b" 
};

const linkStyle = {
  color: "#fffbe7",
  fontWeight: "bold",
  marginRight: "15px"
};

const brandStyle = {
  color: "#fffbe7",
  fontWeight: "bold",
  fontSize: "1.5rem",
  letterSpacing: "2px"
};

const Navbar = () => (
  <nav className="navbar navbar-expand-lg" style={navbarStyle}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/" style={brandStyle}>
        Maquilas Don Andres
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
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" style={linkStyle}>
                Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clientes" style={linkStyle}>
              Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login" style={linkStyle}>
              Iniciar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
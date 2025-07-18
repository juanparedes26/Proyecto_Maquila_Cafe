import React from "react";

const footerStyle = {
  background: "#6f4e37",
  color: "#fffbe7",
  borderTop: "3px solid #c0a16b",
  padding: "18px 0 12px 0",
  textAlign: "center",
  marginTop: "0px",
  fontSize: "1.1rem",
  letterSpacing: "1px"
};

const Footer = () => (
  <footer style={footerStyle} className="footer-fadein">
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
      <span>
        <i className="bi bi-cup-hot coffee-bounce" style={{ color: "#c0a16b", fontSize: "1.3rem", verticalAlign: "middle" }}></i>
        &nbsp;© {new Date().getFullYear()} Maquilas Don Andres
      </span>
      <span className="d-none d-md-inline" style={{ color: "#c0a16b" }}>|</span>
      <span>
        Hecho con <span style={{ color: "#c0392b" }} className="heartbeat">❤️</span> por Juan Manuel Paredes Lopez.
      </span>
    </div>
    <div style={{ fontSize: "0.95rem", color: "#c0a16b", marginTop: "3px" }}>
      Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer;
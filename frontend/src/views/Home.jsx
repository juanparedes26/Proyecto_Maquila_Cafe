import maquilaImg from "../assets/Maquila.jpg";
import React, { useContext } from "react";
import { Context } from "../js/store/appContext.jsx";
import { Link } from "react-router-dom";

function Home() {
  const { store } = useContext(Context);
  return (
    <div
      className="min-vh-100 w-100 d-flex flex-column justify-content-center"
      style={{
        backgroundImage: `url(${maquilaImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        margin: 0,
        padding: 0
      }}
    >
      <div
        className="glass text-center d-flex flex-column align-items-center justify-content-center"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          borderRadius: "18px",
          boxShadow: "0 4px 24px #4b2e19aa",
          padding: "32px 24px",
          background: "rgba(111, 78, 55, 0.7)"
        }}
      >
        <div className="mb-3">
          <i className="bi bi-cup-hot" style={{ fontSize: "2.5rem", color: "#c0a16b" }}></i>
        </div>
        <h1
          className="mb-2"
          style={{
            color: "#fffbe7",
            fontWeight: "bold",
            textShadow: "2px 2px 10px #4b2e19, 0 0 8px #000"
          }}
        >
          ¡Bienvenido a Maquilas Don Andres!
        </h1>
        <p style={{ color: "#c0a16b", fontWeight: "bold", fontSize: "1.1rem" }}>
          ¡Transformando café en experiencias!
        </p>
        <p
          className="lead mb-4"
          style={{
            color: "#fffbe7",
            fontWeight: "500",
            textShadow: "2px 2px 8px #4b2e19, 0 0 6px #000"
          }}
        >
          El mejor lugar para gestionar tus clientes y maquilas de café.<br />
          <span style={{ color: "#fffbe7", textShadow: "1px 1px 6px #4b2e19" }}>
            Sabor, tradición y eficiencia en cada proceso.
          </span>
        </p>
        {!store.token && (
          <Link
            to="/login"
            className="btn btn-lg d-flex align-items-center gap-2 mt-2"
            style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold", borderRadius: "1.5rem" }}
          >
            <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
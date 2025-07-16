import React from 'react';
import maquilaImg from "../assets/Maquila.jpg";

function Home() {
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
      {/* Capa oscura */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(111, 78, 55, 0.7)",
          zIndex: 1
        }}
      />
      {/* Contenido con solo sombra fuerte al texto */}
      <div
        className="text-center d-flex flex-column align-items-center justify-content-center"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          background: "none",
          borderRadius: "18px",
          boxShadow: "none",
          padding: "32px 24px"
        }}
      >
        <h1
          className="mb-3"
          style={{
            color: "#fffbe7",
            fontWeight: "bold",
            textShadow: "2px 2px 10px #4b2e19, 0 0 8px #000"
          }}
        >
          ¡Bienvenido a Maquilas Don Andres!
        </h1>
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
        <a
          href="/login"
          className="btn btn-lg"
          style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}
        >
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}

export default Home;
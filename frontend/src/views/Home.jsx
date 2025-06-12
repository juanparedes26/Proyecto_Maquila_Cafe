import React, { useContext, useEffect } from 'react'
import { Context } from '../js/store/appContext.jsx';

function Home() {

  const { store, actions } = useContext(Context);


  useEffect(() => {

    const getMsgDemo = async () => {
      const msg = await actions.demoFunction();

      if (!msg) {
        store.demoMsg = "Error al obtener el mensaje";
        return false
      }

    }

    getMsgDemo();

  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Mi Marca</a>
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
                <a className="nav-link active" aria-current="page" href="#inicio">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#caracteristicas">Características</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="inicio" className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Tu Solución Innovadora Aquí</h1>
          <p className="lead mb-4">
            Descripción breve y convincente de lo que ofrece tu producto o servicio.
            Atrae a tus visitantes desde el primer momento.
          </p>
          <button className="btn btn-primary btn-lg me-2">Empezar Ahora</button>
          <button className="btn btn-outline-secondary btn-lg">Más Información</button>
        </div>
        <div className="alert alert-success mt-3 w-50 mx-auto" role="alert">
          {store.demoMsg}
        </div>
      </header>

      {/* Features Section */}
      <section id="caracteristicas" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Características Principales</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-rocket-fill h1 text-primary"></i> {/* Requiere Bootstrap Icons */}
                  <h5 className="card-title mt-3">Rendimiento Óptimo</h5>
                  <p className="card-text">
                    Experimenta una velocidad y eficiencia sin precedentes con nuestra tecnología de vanguardia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-shield-lock-fill h1 text-success"></i> {/* Requiere Bootstrap Icons */}
                  <h5 className="card-title mt-3">Seguridad Robusta</h5>
                  <p className="card-text">
                    Tus datos están protegidos con los más altos estándares de seguridad y cifrado.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="bi bi-gem h1 text-info"></i> {/* Requiere Bootstrap Icons */}
                  <h5 className="card-title mt-3">Diseño Intuitivo</h5>
                  <p className="card-text">
                    Una interfaz amigable y fácil de usar que mejora tu experiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-3">¿Listo para transformar tu negocio?</h2>
          <p className="lead mb-4">
            ¡No esperes más! Únete a miles de clientes satisfechos hoy mismo.
          </p>
          <button className="btn btn-light btn-lg">¡Regístrate Ahora!</button>
        </div>
      </section>

      {/* Contact Section (simple) */}
      <section id="contacto" className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">Contáctanos</h2>
          <p className="lead mb-4">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
          <p className="mb-1">Email: info@mimarcacompany.com</p>
          <p className="mb-0">Teléfono: +123 456 7890</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-0">&copy; {new Date().getFullYear()} Mi Marca. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../js/store/appContext.jsx";
import { toast } from "react-toastify";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Clientes() {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editCelular, setEditCelular] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;
  const location = useLocation();

  useEffect(() => {
    if (!store.token || typeof store.token !== "string" || store.token.length === 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    actions.getClientes().finally(() => setIsLoading(false));
  }, [store.token]);

  useEffect(() => {
    if (
      store.token &&
      store.clientes === null
    ) {
      setIsLoading(true);
      actions.getClientes().finally(() => setIsLoading(false));
    }
  }, [store.clientes, store.token]);


  useEffect(() => {
    setPagina(1);
  }, [busqueda]);

  const handleAddCliente = async (e) => {
    e.preventDefault();
    const nuevoCliente = { nombre, celular };
    const result = await actions.addCliente(nuevoCliente);
    if (result) {
      toast.success("Cliente agregado");
      setNombre("");
      setCelular("");
      setIsLoading(true);
      await actions.getClientes();
      setIsLoading(false);
    }
  };

  const handleDeleteCliente = async (clienteId) => {
    MySwal.fire({
      title: '¿Seguro que deseas eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b94a48',
      cancelButtonColor: '#6f4e37',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await actions.deleteCliente(clienteId);
        setIsLoading(true);
        await actions.getClientes();
        setIsLoading(false);
      }
    });
  };

  const startEditCliente = (cliente) => {
    setEditId(cliente.id);
    setEditNombre(cliente.nombre);
    setEditCelular(cliente.celular);
  };

  const handleUpdateCliente = async (e) => {
    if (e) e.preventDefault();
    const result = await actions.updateCliente(editId, { nombre: editNombre, celular: editCelular });
    if (result) {
      setEditId(null);
      setEditNombre("");
      setEditCelular("");
      setIsLoading(true);
      await actions.getClientes();
      setIsLoading(false);
    } else {
      toast.error("No se pudo actualizar el cliente");
    }
  };

  const clientesFiltrados = Array.isArray(store.clientes)
    ? store.clientes
        .filter(cliente =>
          cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          cliente.celular.includes(busqueda)
        )
        .reverse()
    : [];

  const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina);

  const clientesAMostrar = clientesFiltrados.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: "#6f4e37", fontWeight: "bold" }}>Clientes</h2>
      <div className="card shadow-sm mb-4" style={{ background: "#fffbe7", borderRadius: "16px", border: "none" }}>
        <div className="card-body">
          <form className="d-flex gap-2 align-items-center flex-wrap" onSubmit={handleAddCliente}>
            <div className="input-group" style={{ maxWidth: "250px" }}>
              <span className="input-group-text" style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}>
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                style={{ borderColor: "#c0a16b", borderRadius: "0 8px 8px 0" }}
              />
            </div>
            <div className="input-group" style={{ maxWidth: "200px" }}>
              <span className="input-group-text" style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}>
                <i className="bi bi-phone"></i>
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Celular"
                value={celular}
                onChange={e => setCelular(e.target.value)}
                required
                style={{ borderColor: "#c0a16b", borderRadius: "0 8px 8px 0" }}
              />
            </div>
            <button type="submit" className="btn btn-lg d-flex align-items-center gap-2"
              style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold", borderRadius: "1.5rem" }}>
              <i className="bi bi-person-plus"></i> Agregar Cliente
            </button>
          </form>
          {/* Buscador debajo del formulario */}
          <div className="input-group mt-3" style={{ maxWidth: "300px", height: "48px" }}>
            <span className="input-group-text" style={{ background: "#c0a16b", color: "#fffbe7" }}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o celular"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{
                borderColor: "#6f4e37",
                borderRadius: "0 8px 8px 0",
                height: "48px",
                boxShadow: "0 2px 8px rgba(192,161,107,0.1)"
              }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border" style={{ color: "#c0a16b", width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div style={{ color: "#6f4e37", marginTop: "10px" }}>Cargando clientes...</div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle table-striped table-hover" style={{ background: "#fffbe7", borderRadius: "12px", overflow: "hidden" }}>
            <thead style={{ background: "#6f4e37", color: "#fffbe7" }}>
              <tr>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesAMostrar.length > 0 ? (
                clientesAMostrar.map(cliente =>
                  editId === cliente.id ? (
                    <tr key={cliente.id} style={{ background: "#f7ecd7" }}>
                      <td data-label="Nombre">
                        <input
                          type="text"
                          value={editNombre}
                          onChange={e => setEditNombre(e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td data-label="Celular">
                        <input
                          type="number"
                          value={editCelular}
                          onChange={e => setEditCelular(e.target.value)}
                          className="form-control"
                        />
                      </td>
                      <td data-label="Acciones" >
                        <div className="d-flex flex-wrap gap-2">
                          <button type="button" className="btn btn-sm"
                            style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }}
                            onClick={handleUpdateCliente}
                            title="Guardar">
                            <i className="bi bi-check-lg"></i>
                          </button>
                          <button className="btn btn-sm"
                            style={{ background: "#b94a48", color: "#fffbe7", fontWeight: "bold" }}
                            onClick={() => setEditId(null)}
                            title="Cancelar">
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={cliente.id} style={{ background: "#f7ecd7" }}>
                      <td data-label="Nombre" style={{ color: "#4b2e19", fontWeight: "bold", wordBreak: "break-word" }}>{cliente.nombre}</td>
                      <td data-label="Celular" style={{ color: "#4b2e19", wordBreak: "break-word" }}>{cliente.celular}</td>
                      <td data-label="Acciones">
                        <div className="d-flex flex-wrap gap-2">
                          <button className="btn btn-sm"
                            style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }}
                            onClick={() => startEditCliente(cliente)}
                            title="Editar">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm"
                            style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }}
                            onClick={() => navigate(`/perfil-cliente/${cliente.id}`)}
                            title="Ver más">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm"
                            onClick={() => handleDeleteCliente(cliente.id)}
                            style={{ background: "#b94a48", color: "#fffbe7", fontWeight: "bold" }}
                            title="Eliminar">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3} className="text-center" style={{ color: "#6f4e37", background: "#f7ecd7" }}>
                    <i className="bi bi-emoji-frown" style={{ fontSize: "1.2rem" }}></i> No hay clientes registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      
          {totalPaginas > 1 && (
            <div className="text-center mb-3">
              <button
                className="btn btn-outline-secondary btn-sm mx-1"
                disabled={pagina === 1}
                onClick={() => setPagina(p => p - 1)}
              >
                Anterior
              </button>
              <span style={{ fontWeight: "bold", color: "#6f4e37" }}>
                Página {pagina} de {totalPaginas}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm mx-1"
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(p => p + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default Clientes;
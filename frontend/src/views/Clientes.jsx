import React, { useContext, useEffect, useState } from "react";
import { Context } from "../js/store/appContext.jsx";
import { toast } from "react-toastify";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);


function Clientes() {
  const { store, actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editCelular, setEditCelular] = useState("");

  useEffect(() => {
    if (store.token && typeof store.token === "string" && store.token.length > 0) {
      actions.getClientes();
    } else {
      toast.error("Debes iniciar sesión para ver los clientes");
    }
  }, [store.token]);

  const handleAddCliente = async (e) => {
    e.preventDefault();
    const nuevoCliente = { nombre, celular };
    const result = await actions.addCliente(nuevoCliente);
    if (result) {
      toast.success("Cliente agregado");
      setNombre("");
      setCelular("");
      setTimeout(() => actions.getClientes(), 500);
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
      setTimeout(() => actions.getClientes(), 500);
    }
  });
};
const startEditCliente = (cliente) => {
  setEditId(cliente.id);
  setEditNombre(cliente.nombre);
  setEditCelular(cliente.celular);
};

const handleUpdateCliente = async (e) => {
  e.preventDefault();
  const result = await actions.updateCliente(editId, { nombre: editNombre, celular: editCelular });
  if (result) {

    setEditId(null);
    setEditNombre("");
    setEditCelular("");
    setTimeout(() => actions.getClientes(), 500);
  } else {
    toast.error("No se pudo actualizar el cliente");
  }
};







  const clientesFiltrados = store.clientes
    .filter(cliente =>
      cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.celular.includes(busqueda)
    )
    .reverse()
    .slice(0, 5);

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ color: "#6f4e37", fontWeight: "bold" }}>Clientes</h2>
      <form className="mb-4 d-flex gap-2 align-items-center" onSubmit={handleAddCliente}>
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
        <button type="submit" className="btn btn-lg" style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold", borderRadius: "8px" }}>
          Agregar Cliente
        </button>
      </form>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o celular"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          maxWidth: "300px",
          borderColor: "#6f4e37",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(192,161,107,0.1)"
        }}
      />

      <div className="table-responsive">
        <table className="table align-middle" style={{ background: "#fffbe7", borderRadius: "12px", overflow: "hidden" }}>
          <thead style={{ background: "#6f4e37", color: "#fffbe7" }}>
            <tr>
              <th>Nombre</th>
              <th>Celular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
         {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map(cliente =>
                editId === cliente.id ? (
                <tr key={cliente.id} style={{ background: "#f7ecd7" }}>
                    <td>
                    <input
                        type="text"
                        value={editNombre}
                        onChange={e => setEditNombre(e.target.value)}
                        className="form-control"
                    />
                    </td>
                    <td>
                    <input
                        type="number"
                        value={editCelular}
                        onChange={e => setEditCelular(e.target.value)}
                        className="form-control"
                    />
                    </td>
                    <td>
                    <button className="btn btn-sm me-2" style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }} onClick={handleUpdateCliente}>Guardar</button>
                    <button className="btn btn-sm" style={{ background: "#b94a48", color: "#fffbe7", fontWeight: "bold" }} onClick={() => setEditId(null)}>Cancelar</button>
                    </td>
                </tr>
                ) : (
                <tr key={cliente.id} style={{ background: "#f7ecd7" }}>
                    <td style={{ color: "#4b2e19", fontWeight: "bold" }}>{cliente.nombre}</td>
                    <td style={{ color: "#4b2e19" }}>{cliente.celular}</td>
                    <td>
                    <button className="btn btn-sm me-2" style={{ background: "#c0a16b", color: "#fffbe7", fontWeight: "bold" }} onClick={() => startEditCliente(cliente)}>Editar</button>
                    <button className="btn btn-sm me-2" style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }}>Añadir Maquila</button>
                    <button className="btn btn-sm"   onClick={() => handleDeleteCliente(cliente.id)} style={{ background: "#b94a48", color: "#fffbe7", fontWeight: "bold" }}>Eliminar</button>
                    </td>
                </tr>
                )
            )
            ) : (
            <tr>
                <td colSpan={3} className="text-center" style={{ color: "#6f4e37", background: "#f7ecd7" }}>No hay clientes registrados.</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
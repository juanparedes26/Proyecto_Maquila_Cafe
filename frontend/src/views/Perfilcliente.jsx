import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../js/store/appContext.jsx";
import { toast } from "react-toastify";
import MaquilaFormModal from "../components/MaquilaFormModal.jsx";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import MaquilaViewModal from "../components/MaquilaViewModal.jsx";

function PerfilCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [cliente, setCliente] = useState(null);
  const [maquilas, setMaquilas] = useState([]);
  const [showMaquilaModal, setShowMaquilaModal] = useState(false);
  const [editMaquila, setEditMaquila] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [maquilaToView, setMaquilaToView] = useState(null);
  const [showFinalizadas, setShowFinalizadas] = useState(5);
  const [showEnProceso, setShowEnProceso] = useState(5);

  useEffect(() => {
    if (!store.token) {
      toast.error("Debes iniciar sesión para ver el perfil del cliente");
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      const c = await actions.getClienteById(id);
      setCliente(c);
      const m = await actions.getMaquilabyCliente(id);
      setMaquilas(m);
    };
    fetchData();
  }, [id, actions, store.token, navigate]);

  const handleEditMaquila = (maquila) => {
    setEditMaquila(maquila);
    setShowMaquilaModal(true);
  };

  const handleSaveMaquila = async (maquilaData) => {
    let result;
    if (editMaquila) {
      result = await actions.updateMaquila(editMaquila.id, maquilaData);
    } else {
      result = await actions.addMaquila(maquilaData);
    }
    if (result) {
      toast.success(editMaquila ? "Maquila actualizada" : "Maquila añadida correctamente");
      setShowMaquilaModal(false);
      setEditMaquila(null);
      const m = await actions.getMaquilabyCliente(id);
      setMaquilas(m);
    } else {
      toast.error("Error al guardar la maquila");
    }
  };

  const handleDeleteMaquila = async (maquilaId) => {
    const result = await MySwal.fire({
      title: '¿Seguro que deseas eliminar esta maquila?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b94a48',
      cancelButtonColor: '#6f4e37',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const deleteResult = await actions.deleteMaquila(maquilaId);
      if (deleteResult !== false) {
        const m = await actions.getMaquilabyCliente(id);
        setMaquilas(m);
      } else {
        toast.error("Error al eliminar la maquila");
      }
    }
  };

  // Handler para finalizar maquila
  const handleFinalizarMaquila = async (maquilaId) => {
    const result = await actions.updateMaquila(maquilaId, { finalizada: true });
    if (result) {
      toast.success("Maquila finalizada");
      const m = await actions.getMaquilabyCliente(id);
      setMaquilas(m);
    } else {
      toast.error("No se pudo finalizar la maquila");
    }
  };

  // Filtrado usando el campo 'finalizada'
  const maquilasOrdenadas = [...maquilas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const finalizadasAll = maquilasOrdenadas.filter(m => m.finalizada === true);
  const enProcesoAll = maquilasOrdenadas.filter(m => !m.finalizada);

  const finalizadas = finalizadasAll.slice(0, showFinalizadas);
  const enProceso = enProcesoAll.slice(0, showEnProceso);

  // Botón acorde a la paleta, igual que los otros (sin borderRadius extra)
  const finalizarBtnStyle = {
    background: "#c0a16b",
    color: "#fffbe7",
    fontWeight: "bold",
    border: "none",
    boxShadow: "0 2px 6px rgba(192,161,107,0.15)"
  };

  return (
    <div className="container py-4">
      {cliente && (
        <>
          <h1 style={{ color: "#4b2e19", fontWeight: "bold" }}>{cliente.nombre}</h1>
          <h4 style={{ color: "#4b2e19" }}>{cliente.celular}</h4>
          <div className="d-flex align-items-center gap-3 mb-4">
            <button
              className="btn btn-success btn-lg d-flex align-items-center gap-2 shadow"
              style={{ fontWeight: "bold", borderRadius: "1.5rem" }}
              onClick={() => { setShowMaquilaModal(true); setEditMaquila(null); }}
            >
              <i className="bi bi-plus-circle"></i> Añadir Maquila
            </button>
            <button
              className="btn btn-outline-secondary btn-lg d-flex align-items-center gap-2 shadow"
              style={{ fontWeight: "bold", borderRadius: "1.5rem", color: "#6f4e37", borderColor: "#6f4e37" }}
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left-circle"></i> Volver
            </button>
          </div>
          <h5
            style={{
              color: "#4b2e19",
              fontWeight: "bold",
              fontSize: "2rem",
              fontFamily: "'Segoe UI', 'Arial', sans-serif",
              letterSpacing: "1px",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            Maquilas en proceso ⏳
          </h5>

          <div className="table-responsive rounded-4 shadow-sm mb-5" style={{ background: "#fffbe7", padding: "1rem" }}>
            <table className="table align-middle table-striped table-hover table-bordered mb-0">
              <thead style={{ background: "#c0a16b", color: "#fffbe7" }}>
                <tr>
                  <th>Fecha</th>
                  <th>Peso (kg)</th>
                  <th>¿Trillado?</th>
                  <th>Peso después de trilla</th>
                  <th>Grado de tostión</th>
                  <th>Tipo de empaque</th>
                  <th>Cant. libras</th>
                  <th>Observaciones</th>
                  <th>Estado</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {enProceso.map(maquila => (
                  <tr key={maquila.id}>
                    <td>{maquila.fecha}</td>
                    <td>{maquila.peso_kg}</td>
                    <td>{maquila.esta_trillado ? "Sí" : "No"}</td>
                    <td>{maquila.peso_despues_trilla_kg || "-"}</td>
                    <td>{maquila.grado_tostion}</td>
                    <td>{maquila.tipo_empaque}</td>
                    <td>{maquila.cantidad_libras || "-"}</td>
                    <td>{maquila.observaciones || "-"}</td>
                    <td>
                      <span className="badge d-flex align-items-center gap-2" style={{ background: "#c0a16b", color: "#4b2e19", fontWeight: "bold" }}>
                        <i className="bi bi-gear-fill spinner-border spinner-border-sm" style={{ border: "none" }}></i> En proceso
                      </span>
                    </td>
                    <td>
                      {maquila.precio_total
                        ? `$${maquila.precio_total}`
                        : (
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border spinner-border-sm" style={{ color: "#c0a16b" }} role="status">
                              <span className="visually-hidden">En proceso</span>
                            </div>
                          </div>
                        )
                      }
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm"
                          style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }}
                          onClick={() => handleEditMaquila(maquila)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            background: "#b97a56",
                            color: "#fffbe7",
                            fontWeight: "bold"
                          }}
                          onClick={() => handleDeleteMaquila(maquila.id)}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn btn-sm d-flex align-items-center gap-2"
                          style={finalizarBtnStyle}
                          onClick={() => handleFinalizarMaquila(maquila.id)}
                        >
                          <i className="bi bi-check-circle"></i> Finalizar maquila
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {enProcesoAll.length > showEnProceso && (
              <div className="text-center mb-3">
                <button className="btn btn-link" onClick={() => setShowEnProceso(showEnProceso + 5)}>
                  Ver más en proceso
                </button>
              </div>
            )}
          </div>

          <h5
            style={{
              color: "#4b2e19",
              fontWeight: "bold",
              fontSize: "2rem",
              fontFamily: "'Segoe UI', 'Arial', sans-serif",
              letterSpacing: "1px",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            Maquilas finalizadas ✅
          </h5>

          <div className="table-responsive rounded-4 shadow-sm mb-5" style={{ background: "#fffbe7", padding: "1rem" }}>
            <table className="table align-middle table-striped table-hover table-bordered mb-0">
              <thead style={{ background: "#c0a16b", color: "#fffbe7" }}>
                <tr>
                  <th>Fecha</th>
                  <th>Peso (kg)</th>
                  <th>¿Trillado?</th>
                  <th>Peso después de trilla</th>
                  <th>Grado de tostión</th>
                  <th>Tipo de empaque</th>
                  <th>Cant. libras</th>
                  <th>Observaciones</th>
                  <th>Estado</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {finalizadas.map(maquila => (
                  <tr key={maquila.id}>
                    <td>{maquila.fecha}</td>
                    <td>{maquila.peso_kg}</td>
                    <td>{maquila.esta_trillado ? "Sí" : "No"}</td>
                    <td>{maquila.peso_despues_trilla_kg || "-"}</td>
                    <td>{maquila.grado_tostion}</td>
                    <td>{maquila.tipo_empaque}</td>
                    <td>{maquila.cantidad_libras || "-"}</td>
                    <td>{maquila.observaciones || "-"}</td>
                    <td>
                      <span className="badge bg-success">Finalizado</span>
                    </td>
                    <td>
                      {maquila.precio_total_str || `$${maquila.precio_total}`}
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-sm"
                          style={{ background: "#6f4e37", color: "#fffbe7", fontWeight: "bold" }}
                          onClick={() => {
                            setMaquilaToView(maquila);
                            setShowViewModal(true);
                          }}
                        >
                          <i className="bi bi-eye"></i> Ver
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            background: "#b97a56",
                            color: "#fffbe7",
                            fontWeight: "bold"
                          }}
                          onClick={() => handleDeleteMaquila(maquila.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {finalizadasAll.length > showFinalizadas && (
              <div className="text-center mb-3">
                <button className="btn btn-link" onClick={() => setShowFinalizadas(showFinalizadas + 5)}>
                  Ver más finalizadas
                </button>
              </div>
            )}
          </div>

          <MaquilaFormModal
            show={showMaquilaModal}
            onClose={() => { setShowMaquilaModal(false); setEditMaquila(null); }}
            onSubmit={handleSaveMaquila}
            cliente={cliente}
            maquila={editMaquila}
          />
          <MaquilaViewModal
            show={showViewModal}
            onClose={() => setShowViewModal(false)}
            maquila={maquilaToView}
          />
        </>
      )}
    </div>
  );
}

export default PerfilCliente;
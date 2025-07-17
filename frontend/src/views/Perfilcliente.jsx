import React, { useEffect, useState, useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Context } from "../js/store/appContext.jsx";
import { toast } from "react-toastify";
import MaquilaFormModal from "../components/MaquilaFormModal.jsx";

function PerfilCliente() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { store, actions } = useContext(Context);
  const [cliente, setCliente] = useState(null);
  const [maquilas, setMaquilas] = useState([]);
  const [showMaquilaModal, setShowMaquilaModal] = useState(false);
  const [editMaquila, setEditMaquila] = useState(null);


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
      setMaquilas(m.slice(0, 5)); 
    };
    fetchData();
  }, [id, actions]);

    const handleAddMaquila = async (maquilaData) => {
        const result = await actions.addMaquila( maquilaData);
        if (result) {
        toast.success("Maquila añadida correctamente");
        setShowMaquilaModal(false);
        setTimeout(() => actions.getMaquilabyCliente(id), 500);
        } else {
        toast.error("Error al añadir la maquila");
        }
    };
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
    setMaquilas(m.slice(0, 5));
  } else {
    toast.error("Error al guardar la maquila");
  }
};
  
  



  return (
    <div className="container py-4">
      
      {cliente && (
        <>
          <h1 style={{ color: "#6f4e37", fontWeight: "bold" }}>{cliente.nombre}</h1>
          <h4 style={{ color: "#4b2e19" }}>{cliente.celular}</h4>
          <div className="d-flex align-items-center gap-3 mb-3">
                
            <button className="btn btn-success" onClick={() => setShowMaquilaModal(true)}>Añadir Maquila</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </button>
            </div>

            <h5 className="mt-4">Historial de Maquilas</h5>
                    <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
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
                        </tr>
                        </thead>
                     <tbody>
                        {maquilas.map(maquila => (
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
                                {maquila.precio_total
                                ? <span className="badge bg-success">Finalizado</span>
                                : <span className="badge bg-warning text-dark"><i className="bi bi-hourglass-split"></i> En proceso</span>
                                }
                            </td>
                            <td>
                                {maquila.precio_total
                                ? `$${maquila.precio_total}`
                                : <i className="bi bi-hourglass-split"></i>
                                }
                            </td>
                            <td>
                                <button
                                className="btn btn-warning btn-sm"
                                onClick={() => handleEditMaquila(maquila)}
                                >
                                Editar
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>

                    </table>
            </div>

            <MaquilaFormModal
                show={showMaquilaModal}
                onClose={() => { setShowMaquilaModal(false); setEditMaquila(null); }}
                onSubmit={handleSaveMaquila}
                cliente={cliente}
                maquila={editMaquila}
    />


        </>
      )}
    </div>
  );
  }


export default PerfilCliente;
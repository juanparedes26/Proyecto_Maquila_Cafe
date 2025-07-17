import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function MaquilaFormModal({ show, onClose, onSubmit, cliente, maquila }) {
  const [peso_kg, setPesoKg] = useState("");
  const [esta_trillado, setEstaTrillado] = useState(false);
  const [grado_tostion, setGradoTostion] = useState("");
  const [tipo_empaque, setTipoEmpaque] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [cantidad_libras, setCantidadLibras] = useState("");
  const [peso_despues_trilla_kg, setPesoDespuesTrillaKg] = useState("");
  const [cobra_empaque, setCobraEmpaque] = useState(false);
  const [precio_unitario_empaque, setPrecioUnitarioEmpaque] = useState("");

  useEffect(() => {
    if (maquila) {
      setPesoKg(maquila.peso_kg || "");
      setEstaTrillado(maquila.esta_trillado || false);
      setGradoTostion(maquila.grado_tostion || "");
      setTipoEmpaque(maquila.tipo_empaque || "");
      setObservaciones(maquila.observaciones || "");
      setCantidadLibras(maquila.cantidad_libras || "");
      setPesoDespuesTrillaKg(maquila.peso_despues_trilla_kg || "");
      setCobraEmpaque(!!maquila.precio_unitario_empaque);
      setPrecioUnitarioEmpaque(maquila.precio_unitario_empaque || "");
    } else {
      setPesoKg("");
      setEstaTrillado(false);
      setGradoTostion("");
      setTipoEmpaque("");
      setObservaciones("");
      setCantidadLibras("");
      setPesoDespuesTrillaKg("");
      setCobraEmpaque(false);
      setPrecioUnitarioEmpaque("");
    }
  }, [maquila, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!peso_kg || !cliente?.id || !grado_tostion || !tipo_empaque) {
      toast.error("Todos los campos obligatorios deben estar completos");
      return;
    }
    const maquilaData = {
      cliente_id: cliente.id,
      peso_kg,
      esta_trillado,
      grado_tostion,
      tipo_empaque,
      observaciones
    };
    if (!esta_trillado && peso_despues_trilla_kg) {
      maquilaData.peso_despues_trilla_kg = peso_despues_trilla_kg;
    }
    if (
      (tipo_empaque.toLowerCase() === "libras" || tipo_empaque.toLowerCase() === "libra") &&
      cantidad_libras
    ) {
      maquilaData.cantidad_libras = cantidad_libras;
      if (cobra_empaque && precio_unitario_empaque) {
        maquilaData.precio_unitario_empaque = precio_unitario_empaque;
      }
    }
    await onSubmit(maquilaData);
    setPesoKg("");
    setEstaTrillado(false);
    setGradoTostion("");
    setTipoEmpaque("");
    setObservaciones("");
    setCantidadLibras("");
    setPesoDespuesTrillaKg("");
    setCobraEmpaque(false);
    setPrecioUnitarioEmpaque("");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Añadir Maquila para {cliente?.nombre}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Peso (kg) *"
                value={peso_kg}
                onChange={e => setPesoKg(e.target.value)}
                required
              />
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="trillado"
                  checked={esta_trillado}
                  onChange={e => setEstaTrillado(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="trillado">¿Está trillado?</label>
              </div>
              {!esta_trillado && (
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Peso después de trilla (kg)"
                  value={peso_despues_trilla_kg}
                  onChange={e => setPesoDespuesTrillaKg(e.target.value)}
                />
              )}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Grado de tostión *"
                value={grado_tostion}
                onChange={e => setGradoTostion(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Tipo de empaque *"
                value={tipo_empaque}
                onChange={e => setTipoEmpaque(e.target.value)}
                required
              />
              {(tipo_empaque.toLowerCase() === "libras" || tipo_empaque.toLowerCase() === "libra") && (
                <>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Cantidad de libras"
                    value={cantidad_libras}
                    onChange={e => setCantidadLibras(e.target.value)}
                  />
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="cobraEmpaque"
                      checked={cobra_empaque}
                      onChange={e => setCobraEmpaque(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="cobraEmpaque">
                      ¿Se cobra el empaque?
                    </label>
                  </div>
                  {cobra_empaque && (
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Precio unitario del empaque"
                      value={precio_unitario_empaque}
                      onChange={e => setPrecioUnitarioEmpaque(e.target.value)}
                    />
                  )}
                </>
              )}
              <textarea
                className="form-control mb-2"
                placeholder="Observaciones (opcional)"
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MaquilaFormModal;
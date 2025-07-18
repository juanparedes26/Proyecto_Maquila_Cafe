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
    <div className="modal-content rounded-4 shadow" style={{ background: "#fffbe7" }}>
      <form onSubmit={handleSubmit}>
        <div className="modal-header" style={{ borderBottom: "2px solid #c0a16b" }}>
          <h5 className="modal-title" style={{ color: "#6f4e37", fontWeight: "bold", fontSize: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
            🛠️ {maquila ? "Editar" : "Añadir"} Maquila para {cliente?.nombre}
          </h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
              <i className="bi bi-box"></i> Peso (kg) *
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Ej: 50"
              value={peso_kg}
              onChange={e => setPesoKg(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="trillado"
              checked={esta_trillado}
              onChange={e => setEstaTrillado(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="trillado" style={{ color: "#4b2e19" }}>
              ¿Está trillado?
            </label>
          </div>
          {!esta_trillado && (
            <div className="mb-3">
              <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
                <i className="bi bi-arrow-down"></i> Peso después de trilla (kg)
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 45"
                value={peso_despues_trilla_kg}
                onChange={e => setPesoDespuesTrillaKg(e.target.value)}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
              <i className="bi bi-fire"></i> Grado de tostión *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Medio"
              value={grado_tostion}
              onChange={e => setGradoTostion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
              <i className="bi bi-bag"></i> Tipo de empaque *
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Libras, Granel"
              value={tipo_empaque}
              onChange={e => setTipoEmpaque(e.target.value)}
              required
            />
          </div>
          {(tipo_empaque.toLowerCase() === "libras" || tipo_empaque.toLowerCase() === "libra") && (
            <>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
                  <i className="bi bi-123"></i> Cantidad de libras
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 100"
                  value={cantidad_libras}
                  onChange={e => setCantidadLibras(e.target.value)}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="cobraEmpaque"
                  checked={cobra_empaque}
                  onChange={e => setCobraEmpaque(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="cobraEmpaque" style={{ color: "#4b2e19" }}>
                  ¿Se cobra el empaque?
                </label>
              </div>
              {cobra_empaque && (
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
                    <i className="bi bi-cash-coin"></i> Precio unitario del empaque
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 10"
                    value={precio_unitario_empaque}
                    onChange={e => setPrecioUnitarioEmpaque(e.target.value)}
                  />
                </div>
              )}
            </>
          )}
          <div className="mb-3">
            <label className="form-label fw-bold" style={{ color: "#4b2e19" }}>
              <i className="bi bi-chat-left-text"></i> Observaciones (opcional)
            </label>
            <textarea
              className="form-control"
              placeholder="Observaciones"
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer" style={{ borderTop: "2px solid #c0a16b" }}>
          <button type="submit" className="btn btn-success btn-lg">
            <i className="bi bi-save"></i> Guardar
          </button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={onClose}>
            <i className="bi bi-x-circle"></i> Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

export default MaquilaFormModal;
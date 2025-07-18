import React from "react";

function MaquilaViewModal({ show, onClose, maquila }) {
  if (!show || !maquila) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content rounded-4 shadow" style={{ background: "#fffbe7" }}>
          <div className="modal-header" style={{ borderBottom: "2px solid #c0a16b" }}>
            <h5 className="modal-title" style={{ color: "#6f4e37", fontWeight: "bold" }}>
              <i className="bi bi-eye"></i> Detalles de la Maquila
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><b>Peso (kg):</b> {maquila.peso_kg}</p>
            <p><b>¿Trillado?:</b> {maquila.esta_trillado ? "Sí" : "No"}</p>
            <p><b>Peso después de trilla:</b> {maquila.peso_despues_trilla_kg || "-"}</p>
            <p><b>Grado de tostión:</b> {maquila.grado_tostion}</p>
            <p><b>Tipo de empaque:</b> {maquila.tipo_empaque}</p>
            <p><b>Cantidad de libras:</b> {maquila.cantidad_libras || "-"}</p>
            <p><b>Observaciones:</b> {maquila.observaciones || "-"}</p>
            <p><b>Precio total:</b> {maquila.precio_total_str || `$${maquila.precio_total}`}</p>
          </div>
          <div className="modal-footer" style={{ borderTop: "2px solid #c0a16b" }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaquilaViewModal;
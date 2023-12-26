import React from "react";

import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  // bottom: 0,
  backgroundColor: "rgba(34,34,34,0.8)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "100%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 10000,
};

export default function Model({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <button
            className="btn btn-sm btn-danger fs-5"
            style={{ marginLeft: "90%", marginTop: "-1rem" }}
            onClick={onClose}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}

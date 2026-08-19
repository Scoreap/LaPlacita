import { useEffect } from "react";

function Modal({ onClose, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={handleOverlayClick}>
      <div className="admin-modal">

        <button
          type="button"
          className="admin-modal-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {children}

      </div>
    </div>
  );
}

export default Modal;

function Loading({ message = "Cargando el menú..." }) {
  return (
    <div className="menu-status menu-loading" role="status" aria-live="polite">
      <div className="menu-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default Loading;
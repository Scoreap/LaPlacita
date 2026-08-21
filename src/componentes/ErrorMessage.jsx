function ErrorMessage({
  message = "No pudimos cargar el menú. Intenta de nuevo.",
  onRetry,
}) {
  return (
    <div className="menu-status menu-error" role="alert">
      <p>{message}</p>

      {onRetry && (
        <button type="button" className="menu-retry-button" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
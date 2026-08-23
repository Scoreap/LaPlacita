function AdminMenuCard({ dish, onEdit, onDelete, onToggleVisibility }) {
  const isVisible = dish.visible !== false;

  return (
    <article className={"admin-menu-card" + (isVisible ? "" : " is-hidden")}>

      <div className="admin-menu-image">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span>Sin imagen</span>
        )}
      </div>

      <div className="admin-menu-info">
        <div className="admin-menu-main">
          <span className="admin-menu-category">
            {dish.category.toUpperCase()}
          </span>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
        </div>

        <div className="admin-menu-price">
          Q {Number(dish.price).toFixed(2)}
        </div>
      </div>

      <div className="admin-menu-actions">

        <div className="admin-menu-visibility">

          <label className="admin-visibility-toggle">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => onToggleVisibility(dish)}
            />
            <span className="admin-visibility-slider" />
          </label>

          <span className="admin-visibility-label">
            {isVisible ? "Visible" : "Oculto"}
          </span>

        </div>

        <div className="admin-menu-actions-buttons">
          <button
          type="button"
          className="admin-edit-button"
          onClick={() => onEdit(dish)}
          aria-label={`Editar ${dish.name}`}
        >
            Editar
          </button>

        <button className="admin-delete-button" onClick={() => onDelete(dish.id)}>
          Eliminar
        </button>

      </div>
    </article>
  );
}

export default AdminMenuCard;

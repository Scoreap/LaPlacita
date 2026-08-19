function AdminMenuCard({ dish, onEdit, onDelete }) {
  return (
    <article className="admin-menu-card">

      <div className="admin-menu-image">
        {dish.image ? (
          <img src={dish.image} alt={dish.name} />
        ) : (
          "Imagen"
        )}
      </div>


      <div className="admin-menu-info">

        <div className="admin-menu-main">

          <span className="admin-menu-category">
            {dish.category.toUpperCase()}
          </span>

          <h3>
            {dish.name}
          </h3>

          <p>
            {dish.description}
          </p>

        </div>


        <div className="admin-menu-price">
          Q {dish.price.toFixed(2)}
        </div>

      </div>


      <div className="admin-menu-actions">

        <button className="admin-edit-button" onClick={() => onEdit(dish)}>
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

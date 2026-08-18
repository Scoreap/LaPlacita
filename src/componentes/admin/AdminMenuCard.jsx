function AdminMenuCard() {
  return (
    <article className="admin-menu-card">

      <div className="admin-menu-image">
        Imagen
      </div>


      <div className="admin-menu-info">

        <div className="admin-menu-main">

          <span className="admin-menu-category">
            DESAYUNOS
          </span>

          <h3>
            Platillo de ejemplo
          </h3>

          <p>
            Descripción del platillo.
          </p>

        </div>


        <div className="admin-menu-price">
          Q 00.00
        </div>

      </div>


      <div className="admin-menu-actions">

        <button className="admin-edit-button">
          Editar
        </button>

        <button className="admin-delete-button">
          Eliminar
        </button>

      </div>

    </article>
  );
}

export default AdminMenuCard;
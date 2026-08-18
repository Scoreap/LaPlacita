function MenuItemForm() {
  return (
    <div className="menu-item-form">

      <div className="menu-item-form-header">

        <span>
          PLATILLO
        </span>

        <h2>
          Editar platillo
        </h2>

      </div>


      <div className="admin-form-group">

        <label htmlFor="product-name">
          Nombre
        </label>

        <input
          id="product-name"
          type="text"
          placeholder="Nombre del platillo"
        />

      </div>


      <div className="admin-form-group">

        <label htmlFor="product-description">
          Descripción
        </label>

        <textarea
          id="product-description"
          placeholder="Descripción del platillo"
          rows="4"
        />

      </div>


      <div className="admin-form-row">

        <div className="admin-form-group">

          <label htmlFor="product-price">
            Precio
          </label>

          <input
            id="product-price"
            type="number"
            placeholder="0.00"
          />

        </div>


        <div className="admin-form-group">

          <label htmlFor="product-category">
            Categoría
          </label>

          <select id="product-category">

            <option>
              Desayunos
            </option>

            <option>
              Almuerzos
            </option>

            <option>
              Bebidas
            </option>

            <option>
              Postres
            </option>

          </select>

        </div>

      </div>


      <div className="admin-form-actions">

        <button className="admin-cancel-button">
          Cancelar
        </button>

        <button className="admin-primary-button">
          Guardar
        </button>

      </div>

    </div>
  );
}

export default MenuItemForm;
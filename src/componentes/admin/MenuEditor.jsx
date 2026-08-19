import AdminMenuCard from "./AdminMenuCard";

function MenuEditor({ dishes, onEdit, onDelete }) {
  return (
    <section className="menu-editor">

      <div className="menu-editor-header">

        <div>
          <h2>
            Platillos
          </h2>

          <p>
            Aquí podrás administrar los productos
            del menú.
          </p>
        </div>

        <span>
          {dishes.length} {dishes.length === 1 ? "platillo" : "platillos"}
        </span>

      </div>


      {dishes.length === 0 ? (
        <p className="admin-menu-empty">
          Todavía no hay platillos. Usa "+ Agregar platillo" para crear el primero.
        </p>
      ) : (
        <div className="admin-menu-list">

          {dishes.map((dish) => (
            <AdminMenuCard
              key={dish.id}
              dish={dish}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default MenuEditor;

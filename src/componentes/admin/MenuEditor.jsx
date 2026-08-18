import AdminMenuCard from "./AdminMenuCard";

function MenuEditor() {
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
          3 platillos
        </span>

      </div>


      <div className="admin-menu-list">

        <AdminMenuCard />

        <AdminMenuCard />

        <AdminMenuCard />

      </div>

    </section>
  );
}

export default MenuEditor;
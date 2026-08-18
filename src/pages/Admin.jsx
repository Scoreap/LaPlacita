import AdminHeader from "../componentes/admin/AdminHeader";
import MenuEditor from "../componentes/admin/MenuEditor";

function Admin() {
  return (
    <div className="admin-page">

      <AdminHeader />

      <main className="admin-content">

        <section className="admin-heading">

          <div>
            <span>
              ADMINISTRACIÓN
            </span>

            <h1>
              Menú
            </h1>

            <p>
              Administra los platillos y precios
              de La Placita.
            </p>
          </div>

          <button className="admin-add-button">
            + Agregar platillo
          </button>

        </section>


        <MenuEditor />

      </main>

    </div>
  );
}

export default Admin;
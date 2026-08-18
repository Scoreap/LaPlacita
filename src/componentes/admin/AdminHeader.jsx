function AdminHeader() {
  return (
    <header className="admin-header">

      <div className="admin-header-container">

        <div className="admin-brand">
          LA PLACITA
        </div>

        <div className="admin-header-right">

          <span className="admin-user">
            Administrador
          </span>

          <button className="admin-logout-button">
            Cerrar sesión
          </button>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;
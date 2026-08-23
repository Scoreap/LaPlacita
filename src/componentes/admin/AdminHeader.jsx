import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("admin-auth");
    navigate("/admin/login");
  }

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-brand">La Placita</div>

        <div className="admin-header-right">
          <span className="admin-user">Administración del menú</span>
          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

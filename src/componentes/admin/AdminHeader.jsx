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

        <div className="admin-brand">
          LA PLACITA
        </div>

        <div className="admin-header-right">

          <span className="admin-user">
            Administrador
          </span>

          <button className="admin-logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;

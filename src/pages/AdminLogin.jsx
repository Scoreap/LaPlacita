import "../App.css";

function AdminLogin() {
  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-brand">
          LA PLACITA
        </div>

        <span className="admin-login-label">
          ADMINISTRACIÓN
        </span>

        <h1>
          Bienvenido
        </h1>

        <p>
          Ingresa para administrar el menú.
        </p>

        <form className="admin-login-form">

          <div className="admin-form-group">
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
            />
          </div>


          <div className="admin-form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>


          <button
            type="submit"
            className="admin-primary-button"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;
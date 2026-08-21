import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ADMIN_EMAIL = "admin@laplacita.com";
const ADMIN_PASSWORD = "admin123";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      navigate("/admin");
      return;
    }

    setError("Correo o contraseña incorrectos.");
  }

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

        <form className="admin-login-form" onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>


          <div className="admin-form-group">
            <label htmlFor="password">
              Contraseña
            </label>

            <div className="admin-password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

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

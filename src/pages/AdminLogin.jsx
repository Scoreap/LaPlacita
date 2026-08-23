import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <main id="main-content" className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">LA PLACITA</div>
        <span className="admin-login-label">ADMINISTRACIÓN</span>
        <h1>Bienvenido</h1>
        <p>Ingresa para administrar el menú.</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "admin-login-error" : undefined}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Contraseña</label>

            <div className="admin-password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "admin-login-error" : undefined}
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-pressed={showPassword}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {error && (
            <p id="admin-login-error" className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="admin-primary-button">
            Ingresar
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          La Placita
        </Link>

        <nav
          className="navbar-links"
          aria-label="Navegación principal"
        >

          <Link to="/">
            Inicio
          </Link>

          <Link to="/menu">
            Menú
          </Link>

          <Link to="/contacto">
            Contacto
          </Link>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

function Home() {
  return (
    <div className="page">
      <Navbar />

      <main id="main-content">
        <section className="hero" aria-labelledby="home-title">
          <div className="hero-content">
            <span className="hero-label">SABOR DE CASA</span>

            <h1 id="home-title">
              Comedor
              <br />
              La Placita
            </h1>

            <p>Comida rica, preparada como en casa.</p>

            <Link to="/menu" className="hero-button">
              Ver nuestro menú
            </Link>
          </div>
        </section>

        <section className="welcome-section" aria-labelledby="welcome-title">
          <span className="section-label">BIENVENIDOS</span>

          <h2 id="welcome-title">
            Un lugar para
            <br />
            comer rico
          </h2>

          <p>
            En La Placita creemos que una buena comida siempre sabe mejor cuando
            se comparte.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;

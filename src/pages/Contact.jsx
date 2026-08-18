import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ContactForm from "../componentes/ContactForm";

function Contact() {
  return (
    <div className="page">

      <Navbar />

      <main>

        {/* HEADER */}

        <header className="contact-header">

          <span>LA PLACITA</span>

          <h1>Contáctanos</h1>

          <p>
            Estamos para ayudarte.
          </p>

        </header>


        {/* CONTENIDO */}

        <section className="contact-content">

          {/* INFORMACIÓN */}

          <div className="contact-info">

            <span className="section-label">
              HABLEMOS
            </span>

            <h2>
              ¿Tienes alguna pregunta?
            </h2>

            <p>
              Escríbenos para reservar, hacer una pregunta
              o simplemente decirnos qué necesitas.
            </p>


            <div className="contact-details">

              <div>
                <span>Teléfono</span>
                <p>0000-0000</p>
              </div>

              <div>
                <span>Horario</span>
                <p>Lunes a domingo</p>
              </div>

              <div>
                <span>Ubicación</span>
                <p>La Placita</p>
              </div>

            </div>

          </div>


          {/* FORMULARIO */}

          <ContactForm />

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Contact;
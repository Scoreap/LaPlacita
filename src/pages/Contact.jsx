import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import ContactForm from "../componentes/ContactForm";

function Contact() {
  return (
    <div className="page">
      <Navbar />

      <main id="main-content">
        <header className="contact-header">
          <span>LA PLACITA</span>
          <h1>Contáctanos</h1>
          <p>Estamos para ayudarte.</p>
        </header>

        <section className="contact-content" aria-labelledby="contact-title">
          <div className="contact-info">
            <span className="section-label">HABLEMOS</span>

            <h2 id="contact-title">¿Tienes alguna pregunta?</h2>

            <p>
              Escríbenos para reservar, hacer una pregunta o simplemente
              decirnos qué necesitas.
            </p>

            <div className="contact-details">
              <div>
                <span>Teléfono</span>
                <p>5714-1023</p>
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

          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;

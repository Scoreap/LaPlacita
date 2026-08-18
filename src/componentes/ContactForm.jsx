function ContactForm() {
  return (
    <form className="contact-form">

      <div className="form-group">

        <label htmlFor="nombre">
          Nombre
        </label>

        <input
          id="nombre"
          type="text"
          placeholder="Tu nombre"
        />

      </div>


      <div className="form-group">

        <label htmlFor="email">
          Correo electrónico
        </label>

        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
        />

      </div>


      <div className="form-group">

        <label htmlFor="telefono">
          Teléfono
        </label>

        <input
          id="telefono"
          type="tel"
          placeholder="Tu teléfono"
        />

      </div>


      <div className="form-group">

        <label htmlFor="mensaje">
          Mensaje
        </label>

        <textarea
          id="mensaje"
          rows="6"
          placeholder="¿En qué podemos ayudarte?"
        />

      </div>


      <button
        type="button"
        className="contact-button"
      >
        Enviar mensaje
      </button>

    </form>
  );
}

export default ContactForm;
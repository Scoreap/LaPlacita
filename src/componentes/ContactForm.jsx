import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio.";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Por favor, revisa los campos del formulario.");
      document.getElementById(Object.keys(newErrors)[0])?.focus();
      return;
    }

    setIsSending(true);

    try {
      await emailjs.send(
        "service_29vhpkv",
        "template_mdpazt4",
        formData,
        "zK_KIeoj0PUP93o27",
      );

      toast.success("¡Mensaje enviado correctamente!");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
      setErrors({});
    } catch {
      toast.error("No se pudo enviar el mensaje. Inténtalo nuevamente.");
    } finally {
      setIsSending(false);
    }
  }

  function fieldAccessibility(name) {
    return {
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-heading">
        <h2>Envíanos un mensaje</h2>
        <p>Completa el formulario y nos pondremos en contacto contigo.</p>
      </div>

      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          {...fieldAccessibility("nombre")}
        />
        {errors.nombre && (
          <p id="nombre-error" className="form-error" role="alert">
            {errors.nombre}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          {...fieldAccessibility("email")}
        />
        {errors.email && (
          <p id="email-error" className="form-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
          {...fieldAccessibility("telefono")}
        />
        {errors.telefono && (
          <p id="telefono-error" className="form-error" role="alert">
            {errors.telefono}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="6"
          placeholder="¿En qué podemos ayudarte?"
          value={formData.mensaje}
          onChange={handleChange}
          required
          {...fieldAccessibility("mensaje")}
        />
        {errors.mensaje && (
          <p id="mensaje-error" className="form-error" role="alert">
            {errors.mensaje}
          </p>
        )}
      </div>

      <button type="submit" className="contact-button" disabled={isSending}>
        {isSending ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}

export default ContactForm;

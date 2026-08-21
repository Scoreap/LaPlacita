import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function ContactForm() {

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Función para manejar los cambios en los campos del formulario
  //Detecta el cambio en los campos del formulario y actualiza el estado formData con los nuevos valores.
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const validateForm = () => {

    const newErrors = {};


    // Nombre
    if (!formData.nombre.trim()) {

      newErrors.nombre =
        "El nombre es obligatorio.";

    }


    // Correo
    if (!formData.email.trim()) {

      newErrors.email =
        "El correo electrónico es obligatorio.";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Ingresa un correo electrónico válido.";

    }


    // Teléfono
    if (!formData.telefono.trim()) {

      newErrors.telefono =
        "El teléfono es obligatorio.";

    }


    // Mensaje
    if (!formData.mensaje.trim()) {

      newErrors.mensaje =
        "El mensaje es obligatorio.";

    } else if (
      formData.mensaje.trim().length < 10
    ) {

      newErrors.mensaje =
        "El mensaje debe tener al menos 10 caracteres.";

    }
    return newErrors;
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const newErrors = validateForm();

    setErrors(newErrors);

    // Si hay errores
    if (Object.keys(newErrors).length > 0) {

      toast.error(
        "Por favor, revisa los campos del formulario."
      );

      return;
    }


    try {

      await emailjs.send(
        "service_29vhpkv",
        "template_mdpazt4",
        formData,
        "zK_KIeoj0PUP93o27"
      );


      toast.success(
        "¡Mensaje enviado correctamente!"
      );


      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });

      setErrors({});


    } catch (error) {


      toast.error(
        "No se pudo enviar el mensaje. Inténtalo nuevamente."
      );

    }

  };


  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >

      {/* NOMBRE */}

      <div className="form-group">

        <label htmlFor="nombre">
          Nombre
        </label>

        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
        />

        {errors.nombre && (
          <p className="form-error">
            {errors.nombre}
          </p>
        )}

      </div>


      {/* CORREO */}

      <div className="form-group">

        <label htmlFor="email">
          Correo electrónico
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && (
          <p className="form-error">
            {errors.email}
          </p>
        )}

      </div>


      {/* TELÉFONO */}

      <div className="form-group">

        <label htmlFor="telefono">
          Teléfono
        </label>

        <input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder="Tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
        />

        {errors.telefono && (
          <p className="form-error">
            {errors.telefono}
          </p>
        )}

      </div>


      {/* MENSAJE */}

      <div className="form-group">

        <label htmlFor="mensaje">
          Mensaje
        </label>

        <textarea
          id="mensaje"
          name="mensaje"
          rows="6"
          placeholder="¿En qué podemos ayudarte?"
          value={formData.mensaje}
          onChange={handleChange}
        />

        {errors.mensaje && (
          <p className="form-error">
            {errors.mensaje}
          </p>
        )}

      </div>


      <button
        type="submit"
        className="contact-button"
      >
        Enviar mensaje
      </button>

    </form>
  );
}

export default ContactForm;
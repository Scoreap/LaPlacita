import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import Loading from "../componentes/Loading";
import ErrorMessage from "../componentes/ErrorMessage";

import { subscribeToDishes } from "../services/dishesService";


/* =====================================================
   DATOS GENERALES DE HOME
===================================================== */


/*
  CAMBIA LA IMAGEN PRINCIPAL AQUÍ.

  Puedes guardar la fotografía dentro de:

  public/images/

  Ejemplo:
  public/images/portada-home.jpg

  Y utilizar la ruta:
  "/images/portada-home.jpg"
*/
const HERO_IMAGE = "/images/portada-home.jpg";


/*
  Estos son los cuatro platillos que queremos destacar
  en la página principal.

  IMPORTANTE:
  Los nombres deben coincidir exactamente con los nombres
  guardados en Firebase.
*/
const FEATURED_DISH_NAMES = [
  "Desayuno Chapín",
  "Pepián de Pollo",
  "Tostadas de Guacamole",
  "Horchata",
];


/*
  IMÁGENES DE LOS PLATILLOS DESTACADOS.

  Si un platillo ya tiene una imagen guardada en Firebase,
  se utilizará primero esa imagen.

  Si no tiene imagen en Firebase, se utilizará
  alguna de estas imágenes locales.
*/
const FEATURED_IMAGES = {
  "Desayuno Chapín": "/images/desayuno-chapin.jpg",
  "Pepián de Pollo": "/images/pepian.jpg",
  "Tostadas de Guacamole": "/images/tostadas-guacamole.jpg",
  Horchata: "/images/horchata.jpg",
};


/* =====================================================
   RESEÑAS
===================================================== */


/*
  Por ahora las reseñas están almacenadas directamente
  en Home.jsx.
*/
const REVIEWS = [
  {
    id: 1,
    name: "María López",
    rating: 5,
    comment:
      "La comida estaba muy rica y la atención fue excelente. Definitivamente volvería.",
  },

  {
    id: 2,
    name: "Carlos Méndez",
    rating: 5,
    comment:
      "Me gustó mucho el sabor casero. El Pepián estuvo delicioso.",
  },

  {
    id: 3,
    name: "Ana García",
    rating: 4,
    comment:
      "Un lugar agradable para comer con la familia. Muy buena atención.",
  },

  {
    id: 4,
    name: "José Ramírez",
    rating: 5,
    comment:
      "El desayuno chapín estuvo excelente y las porciones son muy buenas.",
  },
];


function Home() {

  /* =====================================================
     ESTADOS
  ===================================================== */


  /*
    dishes guarda los platillos obtenidos desde Firebase.
  */
  const [dishes, setDishes] = useState([]);


  /*
    loading nos permite saber si todavía estamos esperando
    los datos de Firebase.
  */
  const [loading, setLoading] = useState(true);


  /*
    error guarda el mensaje de error si Firebase
    no responde o hay un problema de conexión.
  */
  const [error, setError] = useState(null);


  /*
    reviewIndex guarda la posición de la reseña
    que se está mostrando actualmente.
  */
  const [reviewIndex, setReviewIndex] = useState(0);



  /* =====================================================
     OBTENER PLATILLOS DESDE FIREBASE
  ===================================================== */


  useEffect(() => {

    /*
      subscribeToDishes escucha los datos que están
      almacenados en Firebase.

      Cuando recibe los platillos, los guardamos
      utilizando setDishes().
    */
    const unsubscribe = subscribeToDishes(
      (data) => {

        setDishes(data);

        setLoading(false);

      },
      () => {

        setError("No pudimos cargar los platillos. Intenta de nuevo.");
        setLoading(false);

      },
    );


    /*
      Cuando el usuario sale de Home,
      cancelamos la suscripción a Firebase.

      Esto evita dejar una conexión activa
      innecesariamente.
    */
    return () => unsubscribe();

  }, []);



  /* =====================================================
     PLATILLOS DESTACADOS
  ===================================================== */


  /*
    filter() revisa todos los platillos que vienen
    desde Firebase.

    Solo conserva aquellos cuyos nombres aparecen
    dentro de FEATURED_DISH_NAMES.
  */
  const featuredDishes = dishes.filter((dish) =>
    FEATURED_DISH_NAMES.includes(dish.name)
  );



  /* =====================================================
     FUNCIONES DEL CARRUSEL
  ===================================================== */


  /*
    Avanza hacia la siguiente reseña.

    El operador % permite regresar automáticamente
    a la primera reseña cuando llegamos a la última.
  */
  function nextReview() {

    setReviewIndex((currentIndex) =>
      (currentIndex + 1) % REVIEWS.length
    );

  }


  /*
    Retrocede hacia la reseña anterior.

    Sumamos REVIEWS.length para evitar
    obtener un número negativo.
  */
  function previousReview() {

    setReviewIndex((currentIndex) =>
      (
        currentIndex -
        1 +
        REVIEWS.length
      ) % REVIEWS.length
    );

  }


  /*
    Guardamos la reseña actual en una variable.

    Esto facilita utilizar sus datos dentro del JSX.
  */
  const currentReview = REVIEWS[reviewIndex];



  return (

    <div className="page home-page">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <div className="home-sticky-navbar">
        <Navbar />

      </div>



      <main>


        {/* =================================================
            1. HERO
        ================================================= */}

        <section className="home-hero">


          <img
            src={HERO_IMAGE}
            alt="Mesa con platillos del comedor La Placita"
            className="home-hero-image"
          />


          <div className="home-hero-overlay" />


          <div className="home-hero-content">


            <span>
              SABOR DE CASA
            </span>


            <h1 id="home-title">
              Comedor
              
              <br />
              La Placita
            </h1>


            <p>
              Comida rica, como en casa.
            </p>


            <div className="home-actions">


              <Link
                to="/menu"
                className="home-main-button"
              >
                Ver menú
              </Link>


              <Link
                to="/contacto"
                className="home-secondary-button"
              >
                Reservar
              </Link>


            </div>


          </div>


        </section>



        {/* =================================================
            2. PLATILLOS DESTACADOS
        ================================================= */}

        <section className="home-featured">


          <div className="home-section-heading">


            <span className="section-label">
              CONOCE NUESTROS SABORES
            </span>


            <h2>
              Platillos destacados
            </h2>


            <p>
              Una pequeña muestra de lo que puedes
              encontrar en La Placita.
            </p>


          </div>



          {/* Mientras esperamos los datos de Firebase */}

          {loading && (

            <Loading />

          )}



          {/* Si ocurrió un error al cargar */}

          {!loading && error && (

            <ErrorMessage
              message={error}
              onRetry={() => window.location.reload()}
          />

          )}



          {/* Cuando ya tenemos los datos */}

          {!loading && !error && (

            <div className="home-dishes-grid">


              {featuredDishes.map((dish) => {


                /*
                  Primero utilizamos la imagen guardada
                  en Firebase.

                  Si el platillo no tiene una imagen
                  guardada allí, utilizamos la imagen
                  local correspondiente.
                */
                const dishImage =
                  dish.image ||
                  FEATURED_IMAGES[dish.name];


                return (

                  <article
                    className="home-dish-card"
                    key={dish.id}
                  >


                    {/* ===============================
                        IMAGEN DEL PLATILLO
                    =============================== */}

                    <div className="home-dish-image">


                      <img
                        src={dishImage}
                        alt={`Platillo ${dish.name}`}
                        loading="lazy"
                      />


                    </div>



                    {/* ===============================
                        INFORMACIÓN DEL PLATILLO
                    =============================== */}

                    <div className="home-dish-info">


                      {/*
                        El nombre siempre permanece visible.
                      */}

                      <h3 className="home-dish-name">

                        {dish.name}

                      </h3>



                      {/*
                        Categoría, descripción y precio
                        aparecerán cuando se haga hover.
                      */}

                      <div className="home-dish-details">


                        <span className="home-dish-category">

                          {dish.category}

                        </span>


                        <p>

                          {dish.description}

                        </p>


                        <strong>

                          Q {Number(dish.price).toFixed(2)}

                        </strong>


                      </div>


                    </div>


                  </article>

                );

              })}


            </div>

          )}



          <div className="home-featured-button">


            <Link
              to="/menu"
              className="home-main-button"
            >
              Ver menú completo
            </Link>


          </div>


        </section>



        {/* =================================================
            3. CARRUSEL DE RESEÑAS
        ================================================= */}

        <section className="reviews-section">


          <div className="home-section-heading">


            <span className="section-label">
              NUESTROS CLIENTES
            </span>


            <h2>
              Lo que dicen de La Placita
            </h2>


            <p>
              La experiencia de quienes ya nos han visitado.
            </p>


          </div>



          <div className="review-carousel">


            {/* Botón anterior */}

            <button
              type="button"
              className="review-button"
              onClick={previousReview}
              aria-label="Ver reseña anterior"
            >
              ←
            </button>



            {/* Reseña actual */}

            <article className="review-card">


              <div
                className="review-stars"
                aria-label={
                  `${currentReview.rating} de 5 estrellas`
                }
              >

                {"★".repeat(currentReview.rating)}

              </div>



              <blockquote>


                <p>

                  "{currentReview.comment}"

                </p>


              </blockquote>



              <strong>

                {currentReview.name}

              </strong>



              <p className="review-counter">

                Reseña {reviewIndex + 1}

                {" de "}

                {REVIEWS.length}

              </p>


            </article>



            {/* Botón siguiente */}

            <button
              type="button"
              className="review-button"
              onClick={nextReview}
              aria-label="Ver siguiente reseña"
            >
              →
            </button>


          </div>



          {/* =================================================
              PUNTOS DEL CARRUSEL
          ================================================= */}

          <div className="review-dots">


            {REVIEWS.map((review, index) => (

              <button
                key={review.id}
                type="button"
                className="review-dot"

                onClick={() =>
                  setReviewIndex(index)
                }

                aria-label={
                  `Mostrar reseña ${index + 1}`
                }

                aria-current={
                  reviewIndex === index
                    ? "true"
                    : undefined
                }
              >

                {reviewIndex === index
                  ? "●"
                  : "○"}

              </button>

            ))}


          </div>


        </section>



        {/* =================================================
            4. ¿POR QUÉ LA PLACITA?
        ================================================= */}

        <section className="home-why-section">


          <div className="home-section-heading">


            <span className="section-label">
              NUESTRA ESENCIA
            </span>


            <h2>
              ¿Por qué La Placita?
            </h2>


            <p>
              Un lugar pensado para disfrutar de buena
              comida y compartir buenos momentos.
            </p>


          </div>



          <div className="home-why-grid">


            {/* Primera característica */}

            <article className="home-why-card">


              <h3>
                Sabor casero
              </h3>


              <p>
                Platillos preparados con sabores
                tradicionales y ese toque de comida
                hecha en casa.
              </p>


            </article>



            {/* Segunda característica */}

            <article className="home-why-card">


              <h3>
                Variedad para todos
              </h3>


              <p>
                Desayunos, almuerzos, bebidas,
                entradas y acompañamientos para
                diferentes gustos.
              </p>


            </article>



            {/* Tercera característica */}

            <article className="home-why-card">


              <h3>
                Atención cercana
              </h3>


              <p>
                Queremos que cada visita sea agradable
                y que siempre tengas ganas de regresar.
              </p>


            </article>


          </div>


        </section>



        {/* =================================================
            5. CONTACTO / RESERVA
        ================================================= */}

        <section className="home-contact-section">


          <span>
            TE ESPERAMOS
          </span>


          <h2 id="welcome-title">
            ¿Listo para
             visitarnos?
          </h2>


          <p>
            Descubre nuestro menú o escríbenos
            si deseas reservar o hacer una pregunta.
          </p>



          <div className="home-actions">


            <Link
              to="/menu"
              className="home-main-button"
            >
              Ver menú
            </Link>


            <Link
              to="/contacto"
              className="home-secondary-button"
            >
              Reservar
            </Link>


          </div>


        </section>

      </main>



      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>

  );

}


export default Home;

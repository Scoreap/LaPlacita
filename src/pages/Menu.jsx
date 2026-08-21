import { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import CategoryButton from "../componentes/CategoryButton";
import MenuGrid from "../componentes/MenuGrid";
import Loading from "../componentes/Loading";
import ErrorMessage from "../componentes/ErrorMessage";
import { CATEGORIES } from "../constants/categories";
import { subscribeToDishes } from "../services/dishesService";
function Menu() {
    const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    const unsubscribe = subscribeToDishes(
      (data) => {
        setDishes(data);
        setLoading(false);
      },
      () => {
        setError("No pudimos cargar el menú. Intenta de nuevo.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredDishes =
    selectedCategory === "Todos"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);
  return (
    <div className="page">

      <Navbar />

      <main className="menu-page">

        {/* HEADER */}

        <header className="menu-header">

          <span>LA PLACITA</span>

          <h1>Nuestro Menú</h1>

          <p>
            Comida preparada con cariño y sabor de casa.
          </p>

        </header>


        {/* CONTENIDO */}

        <section className="menu-content">

          {/* CATEGORÍAS */}

          <div className="menu-categories">

            <CategoryButton
              active={selectedCategory === "Todos"}
              onClick={() => setSelectedCategory("Todos")}
            >
              Todos
            </CategoryButton>

            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}

          </div>


{/* ESTADOS: carga, error o menú */}

{loading && <Loading />}

{!loading && error && (
  <ErrorMessage
    message={error}
    onRetry={() => window.location.reload()}
  />
)}

{!loading && !error && <MenuGrid dishes={filteredDishes} />}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Menu;
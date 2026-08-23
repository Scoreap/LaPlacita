import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  const [scrollerState, setScrollerState] = useState({
    isScrollable: false,
    isAtEnd: true,
  });
  const categoriesRef = useRef(null);

  const updateScrollerState = useCallback(() => {
    const scroller = categoriesRef.current;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    setScrollerState({
      isScrollable: maxScrollLeft > 1,
      isAtEnd: maxScrollLeft <= 1 || scroller.scrollLeft >= maxScrollLeft - 1,
    });
  }, []);

  useLayoutEffect(() => {
    const scroller = categoriesRef.current;

    if (!scroller) {
      return undefined;
    }

    const resetCategoriesScroll = () => {
      scroller.scrollLeft = 0;
      updateScrollerState();
    };

    resetCategoriesScroll();
    const animationFrame = window.requestAnimationFrame(resetCategoriesScroll);
    const resizeObserver = new ResizeObserver(updateScrollerState);

    resizeObserver.observe(scroller);
    window.addEventListener("pageshow", resetCategoriesScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("pageshow", resetCategoriesScroll);
    };
  }, [updateScrollerState]);

  useEffect(() => {
    const unsubscribe = subscribeToDishes(
      (data) => {
        setDishes(data);
        setLoading(false);
      },
      () => {
        setError("No pudimos cargar el menú. Intenta de nuevo.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const visibleDishes = dishes.filter((dish) => dish.visible !== false);

  const filteredDishes =
    selectedCategory === "Todos"
      ? visibleDishes
      : visibleDishes.filter((dish) => dish.category === selectedCategory);

  const categoriesShellClass = [
    "menu-categories-shell",
    scrollerState.isScrollable ? "is-scrollable" : "",
    scrollerState.isAtEnd ? "is-at-end" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="page">
      <Navbar />

      <main id="main-content" className="menu-page">
        <header className="menu-header">
          <span>LA PLACITA</span>
          <h1>Nuestro Menú</h1>
          <p>Comida preparada con cariño y sabor de casa.</p>
        </header>

        <section className="menu-content" aria-label="Platillos del menú">
          <div className={categoriesShellClass}>
            <div
              ref={categoriesRef}
              className="menu-categories"
              role="group"
              aria-label="Filtrar menú por categoría"
              onScroll={updateScrollerState}
            >
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
          </div>

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

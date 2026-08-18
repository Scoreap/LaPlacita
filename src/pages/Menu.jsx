import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
import CategoryButton from "../componentes/CategoryButton";
import MenuGrid from "../componentes/MenuGrid";

function Menu() {
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

            <CategoryButton>
              Todos
            </CategoryButton>

            <CategoryButton>
              Desayunos
            </CategoryButton>

            <CategoryButton>
              Almuerzos
            </CategoryButton>

            <CategoryButton>
              Bebidas
            </CategoryButton>

            <CategoryButton>
              Postres
            </CategoryButton>

          </div>


          {/* MENU GRID */}

          <MenuGrid />

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Menu;
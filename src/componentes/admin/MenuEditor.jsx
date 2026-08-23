import { useState } from "react";
import AdminMenuCard from "./AdminMenuCard";
import { CATEGORIES } from "../../constants/categories";

const CATEGORY_FILTERS = ["Todos", ...CATEGORIES];

function MenuEditor({ dishes, onEdit, onDelete, onToggleVisibility }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === "Todos" || dish.category === category;
    const matchesSearch = dish.name.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="menu-editor">

      <div className="menu-editor-header">

        <div>
          <h2>
            Platillos
          </h2>

          <p>
            Aquí podrás administrar los productos
            del menú.
          </p>
        </div>

        <span>
          {dishes.length} {dishes.length === 1 ? "platillo" : "platillos"}
        </span>

      </div>


      <div className="menu-editor-filters">

        <div className="menu-editor-category-buttons">

          {CATEGORY_FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className={
                "menu-editor-category-button" +
                (category === option ? " is-active" : "")
              }
              onClick={() => setCategory(option)}
            >
              {option}
            </button>
          ))}

        </div>

        <div className="menu-editor-search-field">

          <input
            type="text"
            className="menu-editor-search"
            placeholder="Buscar platillo por nombre..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="menu-editor-search-clear"
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}

        </div>

      </div>


      {filteredDishes.length === 0 ? (
        <p className="admin-menu-empty">
          {dishes.length === 0
            ? "Todavía no hay platillos. Usa \"+ Agregar platillo\" para crear el primero."
            : "No se encontraron platillos con esos filtros."}
        </p>
      ) : (
        <div className="admin-menu-list">

          {filteredDishes.map((dish) => (
            <AdminMenuCard
              key={dish.id}
              dish={dish}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleVisibility={onToggleVisibility}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default MenuEditor;

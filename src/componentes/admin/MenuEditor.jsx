import { useState } from "react";
import AdminMenuCard from "./AdminMenuCard";
import { CATEGORIES } from "../../constants/categories";

const CATEGORY_FILTERS = ["Todos", ...CATEGORIES];

function MenuEditor({ dishes, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === "Todos" || dish.category === category;
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="menu-editor" aria-labelledby="menu-editor-title">
      <div className="menu-editor-header">
        <div className="visually-hidden">
          <h2 id="menu-editor-title">Platillos</h2>
          <p>Aquí podrás administrar los productos del menú.</p>
        </div>

        <span aria-live="polite">
          {dishes.length} {dishes.length === 1 ? "platillo" : "platillos"}{" "}
          publicados
        </span>
      </div>

      <div className="menu-editor-filters">
        <div className="menu-editor-search-field">
          <label className="visually-hidden" htmlFor="admin-menu-search">
            Buscar platillo por nombre
          </label>

          <input
            id="admin-menu-search"
            type="search"
            className="menu-editor-search"
            placeholder="Buscar por nombre"
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
              Limpiar
            </button>
          )}
        </div>

        <div
          className="menu-editor-category-buttons"
          role="group"
          aria-label="Filtrar platillos por categoría"
        >
          {CATEGORY_FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className={
                "menu-editor-category-button" +
                (category === option ? " is-active" : "")
              }
              onClick={() => setCategory(option)}
              aria-pressed={category === option}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {filteredDishes.length === 0 ? (
        <p className="admin-menu-empty">
          {dishes.length === 0
            ? 'Todavía no hay platillos. Usa "+ Agregar platillo" para crear el primero.'
            : "No se encontraron platillos con esos filtros."}
        </p>
      ) : (
        <>
          <div className="admin-list-headings" aria-hidden="true">
            <span>PLATO</span>
            <span>CATEGORÍA</span>
            <span>PRECIO</span>
            <span>ACCIONES</span>
          </div>

          <div className="admin-menu-list">
            {filteredDishes.map((dish) => (
              <AdminMenuCard
                key={dish.id}
                dish={dish}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default MenuEditor;

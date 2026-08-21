import MenuCard from "./MenuCard";

function MenuGrid({ dishes }) {
  if (!dishes.length) {
    return (
      <p className="menu-empty">
        No hay platillos en esta categoría por ahora.
      </p>
    );
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <MenuCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default MenuGrid;
function CategoryButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      className={`category-button${active ? " is-active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

export default CategoryButton;
function MenuCard({ dish }) {
  const { name, description, price, image } = dish;

  return (
    <article className="menu-card">

      <div className="menu-card-image">
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <span>Foto del platillo</span>
        )}
      </div>

      <div className="menu-card-content">

        <div className="menu-card-header">
          <h3>{name}</h3>

          <span>Q {Number(price).toFixed(2)}</span>
        </div>

        <p>
          {description}
        </p>

      </div>

    </article>
  );
}

export default MenuCard;
function MenuCard({ dish }) {
  const { name, description, price, image } = dish;

  return (
    <article className="menu-card">

      <div className="menu-card-image">
        {image ? (
          <>
            <img
              className="menu-card-image-backdrop"
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <img
              className="menu-card-image-photo"
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
            />
          </>
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

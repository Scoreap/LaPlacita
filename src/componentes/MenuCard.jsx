function MenuCard() {
  return (
    <article className="menu-card">

      <div className="menu-card-image">
        Foto del platillo
      </div>

      <div className="menu-card-content">

        <div className="menu-card-header">
          <h3>Nombre del platillo</h3>

          <span>Q 00.00</span>
        </div>

        <p>
          Descripción breve del platillo.
        </p>

      </div>

    </article>
  );
}

export default MenuCard;
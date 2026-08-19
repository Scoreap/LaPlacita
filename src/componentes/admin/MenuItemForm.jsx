import { useState } from "react";

const CATEGORIES = [
  "Desayuno",
  "Almuerzo-Cena",
  "Bebida",
  "Entrada",
  "Extra",
];

const emptyDish = {
  name: "",
  description: "",
  price: "",
  category: CATEGORIES[0],
  image: null,
};

function MenuItemForm({ initialValues, onSubmit, onCancel, isSaving }) {
  const isEditing = Boolean(initialValues);

  const [name, setName] = useState(initialValues?.name ?? emptyDish.name);
  const [description, setDescription] = useState(initialValues?.description ?? emptyDish.description);
  const [price, setPrice] = useState(initialValues?.price ?? emptyDish.price);
  const [category, setCategory] = useState(initialValues?.category ?? emptyDish.category);
  const [image, setImage] = useState(initialValues?.image ?? emptyDish.image);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      id: initialValues?.id,
      name,
      description,
      price: parseFloat(price),
      category,
      image,
    });
  }

  return (
    <div className="menu-item-form">

      <div className="menu-item-form-header">
        <span>
          PLATILLO
        </span>

        <h2>
          {isEditing ? "Editar platillo" : "Agregar platillo"}
        </h2>
      </div>


      <form onSubmit={handleSubmit}>

        <div className="admin-form-group">

          <label htmlFor="product-image">
            Imagen
          </label>

          <div className="admin-image-upload">

            <div className="admin-image-preview">
              {image ? (
                <img src={image} alt="Vista previa del platillo" />
              ) : (
                "Sin imagen"
              )}
            </div>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>

        </div>


        <div className="admin-form-group">

          <label htmlFor="product-name">
            Nombre
          </label>

          <input
            id="product-name"
            type="text"
            placeholder="Nombre del platillo"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

        </div>


        <div className="admin-form-group">

          <label htmlFor="product-description">
            Descripción
          </label>

          <textarea
            id="product-description"
            placeholder="Descripción del platillo"
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

        </div>


        <div className="admin-form-row">

          <div className="admin-form-group">

            <label htmlFor="product-price">
              Precio
            </label>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />

          </div>


          <div className="admin-form-group">

            <label htmlFor="product-category">
              Categoría
            </label>

            <select
              id="product-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >

              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}

            </select>

          </div>

        </div>


        <div className="admin-form-actions">

          <button type="button" className="admin-cancel-button" onClick={onCancel} disabled={isSaving}>
            Cancelar
          </button>

          <button type="submit" className="admin-primary-button" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default MenuItemForm;

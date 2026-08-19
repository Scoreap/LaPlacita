import { useState } from "react";
import AdminHeader from "../componentes/admin/AdminHeader";
import MenuEditor from "../componentes/admin/MenuEditor";
import Modal from "../componentes/admin/Modal";
import MenuItemForm from "../componentes/admin/MenuItemForm";

function Admin() {
  const [dishes, setDishes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  function openAddModal() {
    setEditingDish(null);
    setIsModalOpen(true);
  }

  function openEditModal(dish) {
    setEditingDish(dish);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingDish(null);
  }

  function handleSubmit(dish) {
    if (dish.id) {
      setDishes((current) =>
        current.map((item) => (item.id === dish.id ? dish : item))
      );
    } else {
      setDishes((current) => [...current, { ...dish, id: crypto.randomUUID() }]);
    }

    closeModal();
  }

  function handleDelete(id) {
    setDishes((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="admin-page">

      <AdminHeader />

      <main className="admin-content">

        <section className="admin-heading">

          <div>
            <span>
              ADMINISTRACIÓN
            </span>

            <h1>
              Menú
            </h1>

            <p>
              Administra los platillos y precios
              de La Placita.
            </p>
          </div>

          <button className="admin-add-button" onClick={openAddModal}>
            + Agregar platillo
          </button>

        </section>


        <MenuEditor
          dishes={dishes}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

      </main>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <MenuItemForm
            initialValues={editingDish}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}

    </div>
  );
}

export default Admin;

import { useEffect, useState } from "react";
import AdminHeader from "../componentes/admin/AdminHeader";
import MenuEditor from "../componentes/admin/MenuEditor";
import Modal from "../componentes/admin/Modal";
import MenuItemForm from "../componentes/admin/MenuItemForm";
import {
  subscribeToDishes,
  createDish,
  updateDish,
  deleteDish,
} from "../services/dishesService";

function Admin() {
  const [dishes, setDishes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToDishes(setDishes);
    return unsubscribe;
  }, []);

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
    setError("");
  }

  async function handleSubmit({ id, ...dish }) {
    setIsSaving(true);
    setError("");

    try {
      if (id) {
        await updateDish(id, dish);
      } else {
        await createDish(dish);
      }

      closeModal();
    } catch (err) {
      setError("No se pudo guardar el platillo. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    await deleteDish(id);
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
              del restaurante.
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
          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <MenuItemForm
            initialValues={editingDish}
            onSubmit={handleSubmit}
            onCancel={closeModal}
            isSaving={isSaving}
          />
        </Modal>
      )}

    </div>
  );
}

export default Admin;

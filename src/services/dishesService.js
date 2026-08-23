import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const dishesCollection = collection(db, "dishes");

export function subscribeToDishes(onChange) {
  return onSnapshot(dishesCollection, (snapshot) => {
    const dishes = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));

    onChange(dishes);
  });
}

export async function createDish(dish) {
  await addDoc(dishesCollection, dish);
}

export async function updateDish(id, dish) {
  await updateDoc(doc(db, "dishes", id), dish);
}

export async function deleteDish(id) {
  await deleteDoc(doc(db, "dishes", id));
}

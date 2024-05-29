import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

//TODO; create new list item function

export const createNewBucketItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "items"), item);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

//TODO: Get all items

export const getmyBucketList = async () => {
  var allItems = [];

  var q = query(collection(db, "items"), orderBy("priority", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());

    allItems.push({ ...doc.data(), id: doc.id });
  });

  //console.log(allItems)
  return allItems;
};

export const markItemAsCompleted = async (itemId) => {
  const itemRef = doc(db, "items", itemId);

  try {
    await updateDoc(itemRef, {
      isCompleted: true,
    });
    console.log("Item marked as completed");
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
};

export const deleteBucketItem = async (itemId) => {
  const itemRef = doc(db, "items", itemId);

  try {
    await deleteDoc(itemRef);
    console.log("Item successfully deleted");
    return true;
  } catch (e) {
    console.error("Error removing document: ", e);
    return false;
  }
};

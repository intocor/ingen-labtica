import { auth, db } from "../Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

export const getUserData = async () => {
  if (auth.currentUser) {
    const CURRENT_USER_ID = auth.currentUser.uid;
    const LAB_INPUT_REF = collection(db, "labInput");
    const queryUserData = query(
      LAB_INPUT_REF,
      where("createdBy", "==", CURRENT_USER_ID)
    );

    const querySnapshot = await getDocs(queryUserData);
    // querySnapshot.docs.forEach((doc) => {
    //   console.log(`data: ${doc.data()}`);

    // });
    // console.log(querySnapshot);
    return querySnapshot.docs;
  }
};
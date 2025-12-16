import { auth } from "../firebase/firebaseConfig";

export const getAuthData = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const idToken = await user.getIdToken();
  return {
    userId: user.uid,
    idToken,
  };
};

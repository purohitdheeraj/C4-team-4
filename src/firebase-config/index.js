import { db, postsCollection } from "./firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const createPost = async (...rest) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // user ka auth id
    const userId = user.uid;

    const newPost = {
      ...rest,
      author: {
        name: user.displayName,
        userId: userId,
      },
      createdAt: new Date(),
    };
    const docRef = await addDoc(postsCollection, newPost);
    // can be used to identify current note id
    return docRef.id;
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const postRef = doc(db, "posts", postId);

    const postDoc = await getDoc(postRef);

    if (postDoc.exists() && postDoc.data().author.userId === user.uid) {
      await deleteDoc(postRef);
      console.log("Post deleted successfully.");
    } else {
      console.error("Unauthorized to delete this post.");
    }
  } catch (error) {
    console.error("Error deleting post", error);
    throw error;
  }
};

export const editPost = async (postId, updatedData) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const postRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postRef);

    if (postDoc.exists() && postDoc.data().author.userId === user.uid) {
      await updateDoc(postRef, updatedData);
      console.log("Post updated successfully.");
    } else {
      console.error("Unauthorized to edit this post.");
    }
  } catch (error) {
    console.error("Error editing post", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const postRef = collection(db, "posts");
    const querySnapshot = await getDocs(postRef);
    const posts = [];

    querySnapshot.forEach((doc) => {
      const postData = {
        id: doc.id,
        ...doc.data(),
      };
      posts.push(postData);
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

export const getAllPostsById = async (userId) => {
  try {
    const postRef = collection(db, "posts");
    const querySnapshot = await getDocs(postRef);

    const posts = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().author.userId === userId) {
        const postData = {
          id: doc.id,
          ...doc.data(),
        };
        posts.push(postData);
      }
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

// User Collection

export const createUserDocument = async (user) => {
  try {
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, user.uid);

    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error creating user document", error);
    throw error;
  }
};

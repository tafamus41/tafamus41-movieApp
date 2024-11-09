import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import React, { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../auth/firebase";
  import { useNavigate } from "react-router-dom";
  import {
    toastErrorNotify,
    toastSuccessNotify,
    toastWarnNotify,
  } from "../helpers/ToastNotify";
  
  export const AuthContext = createContext();
  export const useAuthContext = () => {
    return useContext(AuthContext);
  };
  
  const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      userObserver();
    }, []);
  
    const createUser = async (email, password, displayName) => {
      try {
        //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(auth.currentUser, {
          displayName,
        });
        navigate("/");
        toastSuccessNotify("Registered successfully");
      } catch (error) {
        toastErrorNotify(error.message);
      }
    };
    const signIn = async (email, password) => {
      try {
        //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      } catch (error) {
        toastErrorNotify(error.message);
      }
    };
  
    const logOut = () => {
      signOut(auth)
        .then(() => {
          toastSuccessNotify("Logged out successfully");
        })
        .catch((error) => {
          toastErrorNotify(error.message);
        });
    };
  
    const userObserver = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { email, displayName, photoURL } = user;
          setCurrentUser({ email, displayName, photoURL });
        } else {
          setCurrentUser(false);
        }
      });
    };
    
    const googleProvider = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          navigate("/");
          toastSuccessNotify("Logged in successfully");
        })
        .catch((error) => {
          console.log(error);
          toastErrorNotify(error.message);
        });
    };
  
    const forgotPassword = (email) => {
      //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toastWarnNotify("Please check your mail box!");
        })
        .catch((error) => {
          toastErrorNotify(error.message);
        });
    };
    const values = {
      currentUser,
      createUser,
      signIn,
      logOut,
      googleProvider,
      forgotPassword,
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
  };
  
  export default AuthProvider;
  

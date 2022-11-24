import React, {createContext, useEffect, useState} from 'react';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from "firebase/auth";
import app from '../firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    // All Provider
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    // Sign in with google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Sign in with facebook
    const signInWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    // Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update user
    const updateUser = (fullName, image) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: image
        });
    };

    // Sign in with email and password
    const signInWithEmailPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // unsubscribe
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const usersAddToDb = async (user) => {
        try {
            await fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            console.log('User Added Successfully!!!');
        } catch(error) {
            console.error(error.message);
        }
    };

    const authInfo = {
        user,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
        loading,
        createUser,
        updateUser,
        signInWithEmailPassword,
        usersAddToDb
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
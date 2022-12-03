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
    signInWithEmailAndPassword,
    deleteUser
} from "firebase/auth";
import app from '../firebase/Firebase.config';
import Swal from 'sweetalert2';

export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [render, setRender] = useState(false);

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

    // Delete users
    const userDelete = () => {
        setLoading(true);
        return deleteUser(auth.currentUser);
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

    // Data add to db
    const dataAddToDb = (data, url) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

    // User Check in db
    const isUserExist = (email) => {
        return fetch(`http://localhost:5000/users2/${email}`);
    };

    // Delete Confirmation
    const deleteConfirmation = () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    };

    // Report Confirmation
    const reportConfirmation = () => {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You are going to report to admin about this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Report!'
        });
    };

    const buyerConfirmation = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry, you are not buyer!',
            footer: '<Link>Please, login with your buyer account.<Link>'
        });
    };

    const authInfo = {
        user,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
        loading,
        setLoading,
        createUser,
        updateUser,
        signInWithEmailPassword,
        userDelete,
        open,
        setOpen,
        render,
        setRender,
        dataAddToDb,
        isUserExist,
        deleteConfirmation,
        reportConfirmation,
        buyerConfirmation
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
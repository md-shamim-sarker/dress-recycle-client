import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import AddProducts from "../pages/AddProducts/AddProducts";
import AllProducts from "../pages/AllProducts/AllProducts";
import Blog from "../pages/Blog/Blog";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MyProducts from "../pages/MyProducts/MyProducts";
import MyWishList from "../pages/MyWishList/MyWishList";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/blog",
                element: <Blog></Blog>
            },
            {
                path: "/allProducts",
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>
            },
            {
                path: "/addProducts",
                element: <PrivateRoute><AddProducts></AddProducts></PrivateRoute>
            },
            {
                path: "/myProducts",
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: "/myWishList",
                element: <PrivateRoute><MyWishList></MyWishList></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
        ],
        errorElement: <ErrorPage></ErrorPage>
    }
]);

export default router;
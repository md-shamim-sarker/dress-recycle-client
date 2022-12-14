import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProducts from "../pages/Home/Banner/AddProducts/AddProducts";
import Blog from "../pages/Blog/Blog";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyProducts from "../pages/MyProducts/MyProducts";
import MyWishLists from "../pages/MyWishList/MyWishLists";
import Products from "../pages/Products/Products";
import PrivateRoute from "./PrivateRoute";
import ReportedItems from "../pages/ReportedItems/ReportedItems";
import Admins from "../pages/Users/Admins/Admins";
import Sellers from "../pages/Users/Sellers/Sellers";
import Buyers from "../pages/Users/Buyers/Buyers";
import UpdateProducts from "../pages/UpdateProducts/UpdateProducts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Payment from "../pages/Payment/Payment";
import Loading from "../components/Loading";

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
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/categories/:id",
                loader: ({params}) => fetch(`https://dress-recycle-server.vercel.app/categories/${params.id}`),
                element: <Products></Products>
            }
        ],
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: "/dashboard/role/admins",
                element: <PrivateRoute><Admins></Admins></PrivateRoute>
            },
            {
                path: "/dashboard/role/sellers",
                element: <PrivateRoute><Sellers></Sellers></PrivateRoute>
            },
            {
                path: "/dashboard/role/buyers",
                element: <PrivateRoute><Buyers></Buyers></PrivateRoute>
            },
            {
                path: "/dashboard/myOrders",
                element: <MyOrders></MyOrders>
            },
            {
                path: "/dashboard/addProducts",
                element: <PrivateRoute><AddProducts></AddProducts></PrivateRoute>
            },
            {
                path: "/dashboard/myProducts",
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: "/dashboard/myWishList",
                element: <PrivateRoute><MyWishLists></MyWishLists></PrivateRoute>
            },
            {
                path: "/dashboard/reportedItems",
                element: <PrivateRoute><ReportedItems></ReportedItems></PrivateRoute>
            },
            {
                path: "/dashboard/update/:id",
                loader: ({params}) => fetch(`https://dress-recycle-server.vercel.app/products/id/${params.id}`),
                element: <PrivateRoute><UpdateProducts></UpdateProducts></PrivateRoute>
            },
            {
                path: "/dashboard/payment/:id",
                loader: ({params}) => fetch(`https://dress-recycle-server.vercel.app/orders/id/${params.id}`),
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "/dashboard/loading",
                element: <Loading></Loading>
            }
        ],
        errorElement: <ErrorPage></ErrorPage>
    }
]);

export default router;
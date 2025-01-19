import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ArticleDetail from "../Pages/Articles/ArticleDetail/ArticleDetail";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import DashHome from "../Pages/Dashboard/DashHome";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Addpublisher from "../Pages/Dashboard/AddPublisher/Addpublisher";
import AllArticles from "../Pages/Articles/AllArticles";
import AddArticle from "../Pages/Articles/AddArticle/AddArticle";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/articles/:id",
        element: <ArticleDetail></ArticleDetail>,
      },
      {
        path: "/articles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/addarticles",
        element: <AddArticle></AddArticle>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard></Dashboard>
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashHome></DashHome>,
      },
      {
        path: "alluser",
        element: <AllUser></AllUser>,
      },
      {
        path: "addpublisher",
        element:<Addpublisher></Addpublisher> ,
      },
    ],
  },
]);

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
import MyArticle from "../Pages/Articles/MyArticle/MyArticle";
import PremiumArticle from "../Pages/Articles/PremiumArticle/PremiumArticle";
import AdminAllArticles from "../Pages/Dashboard/AllArticle/AdminAllArticles";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Subscription from "../Pages/Subscription/Subscription";
import Payment from "../Pages/Subscription/Payment";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/articles/:id",
        element: (
          <PrivateRoute>
            <ArticleDetail></ArticleDetail>,
          </PrivateRoute>
        ),
      },
      {
        path: "/articles",
        element: <AllArticles></AllArticles>,
      },
      {
        path: "/premium",
        element: (
          <PrivateRoute>
            <PremiumArticle></PremiumArticle>
          </PrivateRoute>
        ),
      },
      {
        path: "/addarticles",
        element: (
          <PrivateRoute>
            <AddArticle></AddArticle>,
          </PrivateRoute>
        ),
      },
      {
        path: "/myarticles",
        element: (
          <PrivateRoute>
            <MyArticle></MyArticle>
          </PrivateRoute>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription></Subscription>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
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
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: <Addpublisher></Addpublisher>,
      },
      {
        path: "allarticles",
        element: <AdminAllArticles></AdminAllArticles>,
      },
    ],
  },
]);

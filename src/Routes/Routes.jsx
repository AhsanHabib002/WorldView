import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ArticleDetail from "../Pages/Articles/ArticleDetail/ArticleDetail";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import DashHome from "../Pages/Dashboard/DashHome";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element: <Home></Home>,
        },
        {
            path:"/articles/:id",
            element: <ArticleDetail></ArticleDetail>
        },
        {
            path:"login",
            element:<Login></Login>
        },
        {
            path:"register",
            element:<Register></Register>
        },
      ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path:'/dashboard',
                element:<DashHome></DashHome>
            },
            {
                path:'alluser',
                element:<AllUser></AllUser>
            },
        ]
    }
  ]);
import { createBrowserRouter, Navigate } from "react-router-dom";

import { loginFormFields, signUpFormFields } from "../utils/formFields.js";

import AuthLayout from "../components/_layouts/AuthLayout/AuthLayout";
import AuthFormFactory from "../components/AuthFormFactory/AuthFormFactory";
import NotFoundPage from "../components/FeedbackComponents/NotFoundPage/NotFoundPage";

import MainNavBarLayout from "../components/_layouts/MainNavBarLayout/MainNavBarLayout";
import ProtectedRoute from "../components/PotectedRoute";

import AllPosts from "../Pages/AllPosts/AllPosts";
import CreatePost from "../Pages/CreatePost/CreatePost";
import LandingPage from "../Pages/LandingPage/LandingPage";
import PostById from "../Pages/PostById/PostById";
import PostsByTag from "../Pages/PostsByTag/PostsByTag";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <LandingPage />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      {
        path: "login",
        element: <AuthFormFactory fields={loginFormFields} formType="Login" />,
      },
      {
        path: "register",
        element: (
          <AuthFormFactory fields={signUpFormFields} formType="Sign Up" />
        ),
      },
    ],
  },

  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <MainNavBarLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AllPosts /> },

      { path: "my-posts", element: <ProfilePage /> },
      { path: "users/:username", element: <ProfilePage /> },

      {
        path: "posts",
        children: [
          { index: true, element: <AllPosts /> },
          { path: "create", element: <CreatePost /> },
          { path: ":id", element: <PostById /> },
          { path: "tags/:tag", element: <PostsByTag /> },
        ],
      },
    ],
  },
]);

export default router;

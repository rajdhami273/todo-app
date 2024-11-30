import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Components
import App from "./App";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Profile } from "./pages/profile/Profile";
import { TodoPage } from "./pages/todo/TodoPage";

// actions
import { userActions } from "./redux/user/userSlice";

// utils
import { httpClient } from "./utils/httpClient";

function ProtectedApp(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    async function getMe() {
      try {
        const res = await httpClient.get("/user/me");
        const { user } = res.data;
        dispatch(userActions.addUser(user));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getMe();
  }, [dispatch]);
  if (loading) {
    return "Loading...";
  }
  if (user._id) {
    return props.children;
  }
  return <Navigate to="/login" replace={true} />;
}

// creating routes
export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedApp>
        <App />
      </ProtectedApp>
    ),
    children: [
      {
        path: "/",
        element: <TodoPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

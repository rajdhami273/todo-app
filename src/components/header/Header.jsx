import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// actions
import { userActions } from "../../redux/user/userSlice";
// utils
import { httpClient } from "../../utils/httpClient";

import "./Header.css";
import { todoActions } from "../../redux/todos/todoSlice";

export function Header() {
  const dispatch = useDispatch();
  async function logout() {
    try {
      await httpClient.get("/user/logout");
      dispatch(userActions.addUser({}));
      dispatch(todoActions.addAllTodos([]));
    } catch (error) {}
  }
  return (
    <header className="headerContainer px-2">
      <Link to={"/"}>
        <span>Logo</span>
      </Link>
      <span>
        <Link to={"/profile"}>Profile</Link> |{" "}
        <Link onClick={logout}>Logout</Link>
      </span>
    </header>
  );
}

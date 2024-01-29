import { useLocation } from "react-router-dom";
import { withCondition } from "./withCondition";
import { useSelector } from "react-redux";

/** A higher-order wrapper, binding the "user logged in" condition and redirect */
export const withLoggedIn = (Component) => {
  const condition = useSelector((state) => state.authedUser);
  const location = useLocation();

  return withCondition(Component, condition, "/login", location);
};

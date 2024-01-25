import { withCondition } from "./withCondition";
import { useSelector } from "react-redux";

/** A higher-order wrapper, binding the "user logged in" condition and redirect */
export const withLoggedIn = (Component) =>
  withCondition(
    Component,
    useSelector((state) => state.authedUser),
    "/login",
  );

/** The inverse, showing a page only if a user is logged OUT */
export const withLoggedOut = (Component) =>
  withCondition(Component, !useSelector((state) => state.authedUser), "/");

import { authenticateUser } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

export function handleLogin(username, password) {
  return (dispatch) => {
    dispatch(showLoading());

    return authenticateUser({
      username,
      password,
    })
      .then((user) => dispatch(setAuthedUser(user.id)))
      .then(() => dispatch(hideLoading()))
      .catch((err) => {
        dispatch(hideLoading());
        throw err;
      });
  };
}

export function handleLogout() {
  return (dispatch) => {
    dispatch(showLoading());
    dispatch(setAuthedUser(null));
    dispatch(hideLoading());
  };
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

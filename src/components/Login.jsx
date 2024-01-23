import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import { handleLogin } from "../store/actions/authedUser";

const Login = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleBlur = (event) => {
    event.preventDefault();
    if (event.target.name === "username") {
      if (event.target.value === "") {
        setError("Username is required");
      } else {
        setError("");
      }
    } else if (event.target.name === "password") {
      if (event.target.value === "") {
        setError("Password is required");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password);

    dispatch(handleLogin(username, password))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <input type="submit" value="Submit" />
      {error ? (
        <p
          style={{
            color: "red",
            fontSize: "1.2rem",
            margin: "1rem 0",
          }}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const connectedLogin = connect()(Login);

export default connectedLogin;

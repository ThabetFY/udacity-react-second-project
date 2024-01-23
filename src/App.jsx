import { useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { useNavigate, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";

import Dashboard from "./components/Dashboard";
import { handleInitialData } from "./store/actions/shared";
import Login from "./components/Login";
import Nav from "./components/Nav";

function App({ dispatch, authedUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
    if (authedUser) {
      dispatch(handleInitialData(authedUser));
    }
  }, [dispatch, authedUser, navigate]);

  return (
    <>
      <LoadingBar />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/Question/:id" element={<Question />} />
            <Route path="/new" element={<NewQuestion />} /> */}
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
};

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;

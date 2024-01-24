import { useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { useNavigate, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { handleInitialData } from "./store/actions/shared";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";
import QuestionPage from "./components/QuestionPage";
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
      <LoadingBar className="loading-bar" />
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/new" element={<NewQuestion />} />
          <Route path="/Question/:id" element={<QuestionPage />} />
        </Routes>
      </div>
    </>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  loading: authedUser === null,
});

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
};

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;

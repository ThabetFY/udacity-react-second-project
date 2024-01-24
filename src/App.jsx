import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { useNavigate, Routes, Route } from "react-router-dom";

import { handleInitialData } from "./store/actions/shared";
import Dashboard from "./components/Dashboard";
import Leaderboard from "./components/Leaderboard";
import NewQuestion from "./components/NewQuestion";
import QuestionPage from "./components/QuestionPage";
import Login from "./components/Login";
import Nav from "./components/Nav";

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();

  useEffect(() => {
    authedUser ? dispatch(handleInitialData(authedUser)) : navigate("/login");
  }, [dispatch, authedUser, navigate]);

  return (
    <div className="flex flex-col min-h-screen ">
      <LoadingBar className="sticky" />
      <Nav />
      <main className="container mx-auto flex justify-center items-center flex-1 mt-8">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/new" element={<NewQuestion />} />
          <Route path="/Question/:id" element={<QuestionPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

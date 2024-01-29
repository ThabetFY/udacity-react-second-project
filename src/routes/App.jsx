import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";

import { handleInitialData } from "@/store/actions/shared";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Login from "./Login";
import Nav from "../components/Nav";
import { withLoggedIn } from "@/components/withLoggedIn";
import _404 from "./404";

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData(authedUser));
  }, [authedUser, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingBar />
      <Nav />
      <main className="container mx-auto flex justify-center items-center flex-1 mt-8">
        <Routes>
          <Route path="/" element={withLoggedIn(Dashboard)()} />
          <Route path="/leaderboard" element={withLoggedIn(Leaderboard)()} />
          <Route path="/new" element={withLoggedIn(NewQuestion)()} />
          <Route path="/question/:id" element={withLoggedIn(QuestionPage)()} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";

import { handleInitialData } from "../store/actions/shared";
import Dashboard from "../components/Dashboard";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Login from "./Login";
import Nav from "../components/Nav";
import { withLoggedIn, withLoggedOut } from "@/components/withLoggedIn";
import _404 from "./404";

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    dispatch(handleInitialData(authedUser));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <LoadingBar />
      <Nav />
      <main className="container mx-auto flex justify-center items-center flex-1 mt-8">
        <Routes>
          <Route path="/" exact element={withLoggedIn(Dashboard)()} />
          <Route path="/login" element={withLoggedOut(Login)()} />
          <Route path="/leaderboard" element={withLoggedIn(Leaderboard)()} />
          <Route path="/new" element={withLoggedIn(NewQuestion)()} />
          <Route path="/Question/:id" element={withLoggedIn(QuestionPage)()} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

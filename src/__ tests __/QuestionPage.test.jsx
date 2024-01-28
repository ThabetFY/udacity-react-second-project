import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";

import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "../store/reducers";
import middleware from "../store/middleware";

import QuestionPage from "../routes/QuestionPage";

const initialState = {
  authedUser: "tylermcginnis",
  questions: {
    123: {
      id: "123",
      author: "sarahedo",
      timestamp: 1641092819677,
      optionOne: {
        votes: ["tylermcginnis"],
        text: "Option One Text",
      },
      optionTwo: {
        votes: [],
        text: "Option Two Text",
      },
    },
  },
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      avatarURL: "https://example.com/sarah.png",
    },
  },
};

const store = createStore(rootReducer, initialState, middleware);
const questionId = "123";
describe("<QuestionPage />", () => {
  test("QuestionPage mounts properly", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/question/${questionId}`]}>
          <Routes>
            <Route path="/question/:id" element={<QuestionPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  });

  test("renders the QuestionPage", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/question/${questionId}`]}>
          <Routes>
            <Route path="/question/:id" element={<QuestionPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Check if the question text is rendered
    expect(getByText("Option One Text")).toBeInTheDocument();
    expect(getByText("Option Two Text")).toBeInTheDocument();

    // Check if the author's name is rendered
    expect(
      getByText(`Poll by ${initialState.users.sarahedo.name}`),
    ).toBeInTheDocument();
  });
});

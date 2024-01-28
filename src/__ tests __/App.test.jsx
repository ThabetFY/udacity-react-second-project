import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";

import App from "../routes/App";
import { render } from "./test-utils";

describe("<App />", () => {
  test("App mounts properly", async () => {
    render(<App />);
  });

  test("redirects to login if not authenticated", async () => {
    const { getByText } = render(<App />);

    expect(getByText("Login to your account")).toBeInTheDocument();
  });

  test("redirects to dashboard if authenticated", async () => {
    const initialState = {
      authedUser: "tylermcginnis", // Replace with your actual authenticated user state
    };
    const { getByText } = render(<App />, { initialState, route: "/login" });

    await waitFor(() => {
      expect(
        getByText(/Here you find the questions that you have not voted/i),
      ).toBeInTheDocument();
    });
  });
});

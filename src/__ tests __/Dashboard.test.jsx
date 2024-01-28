import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

import Dashboard from "../routes/Dashboard";
import { render } from "./test-utils";

describe("<Dashboard />", () => {
  test("Dashboard mounts properly", async () => {
    render(<Dashboard />);
  });

  test("New questions tab is shown by defulte", async () => {
    const initialState = {
      authedUser: "tylermcginnis",
    };
    const { getByText } = render(<Dashboard />, { initialState });
    await waitFor(() => {
      expect(
        getByText("Here you find the questions that you have not voted"),
      ).toBeInTheDocument();
    });
  });

  test("Done questions tab is shown after clicking Done", async () => {
    const initialState = {
      authedUser: "tylermcginnis",
    };
    const { getByText, findByRole } = render(<Dashboard />, { initialState });

    const doneQuestionsTab = await findByRole("tab", {
      name: /Done Questions/,
    });

    userEvent.click(doneQuestionsTab);

    await waitFor(() => {
      expect(
        getByText("Here you find the questions that you have voted"),
      ).toBeInTheDocument();
    });
  });
});

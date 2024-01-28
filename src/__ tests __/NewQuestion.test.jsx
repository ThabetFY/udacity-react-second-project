import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";

import NewQuestion from "../routes/NewQuestion";
import { render } from "./test-utils";

describe("<NewQuestion />", () => {
  test("NewQuestion mounts properly", async () => {
    render(<NewQuestion />);
  });

  test("renders the NewQuestion form", async () => {
    const initialState = {
      authedUser: "tylermcginnis",
    };

    const { getByText } = render(<NewQuestion />, { initialState });
    await waitFor(() => {
      expect(getByText("Add new question")).toBeInTheDocument();
      expect(getByText("First Option")).toBeInTheDocument();
      expect(getByText("Second Option")).toBeInTheDocument();
    });
  });
});

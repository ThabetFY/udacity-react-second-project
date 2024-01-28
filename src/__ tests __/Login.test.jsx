import { describe, it, expect } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "./test-utils"; // Importing custom render function
import Login from "../routes/Login";

describe("Login Component", () => {
  it("renders correctly", () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("submits the form with username and password", async () => {
    const { getByLabelText, getByRole, store } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "tylermcginnis" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "abc321" },
    });

    fireEvent.click(getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      const newState = store.getState();
      expect(newState.authedUser).toBe("tylermcginnis");
    });
  });

  it("displays an error message when login fails", async () => {
    const errorMessage = "No such user";
    const { getByLabelText, getByRole } = render(<Login />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: "test" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

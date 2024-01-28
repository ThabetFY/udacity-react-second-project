import { describe, test, expect } from "vitest";
import { waitFor } from "@testing-library/react";

import Leaderboard from "@/routes/Leaderboard";
import { render } from "./test-utils";

// Mock Redux store

describe("Leaderboard", () => {
  test("Leaderboard mounts properly", async () => {
    render(<Leaderboard />);
  });

  test("renders the leaderboard table", async () => {
    const initialState = {
      authedUser: "tylermcginnis",
      users: {
        user1: {
          id: "user1",
          name: "Alice",
          answers: { q1: "optionOne" },
          questions: ["q2", "q3"],
        },
        user2: {
          id: "user2",
          name: "Bob",
          answers: { q2: "optionTwo" },
          questions: [],
        },
        // Add more mock users if needed
      },
    };
    const { getByText } = render(<Leaderboard />, { initialState });
    await waitFor(() => {
      expect(getByText("Alice")).toBeInTheDocument();
      expect(getByText("Bob")).toBeInTheDocument();
    });
  });
});

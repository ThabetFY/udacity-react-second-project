import { describe, it, expect } from "vitest";
import { _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestionAnswer", () => {
  it("returns true when correctly formatted data is passed", async () => {
    const authedUser = "sarahedo";
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer }),
    ).resolves.toBe(true);
  });

  it("returns an error if incorrect data is passed", async () => {
    const authedUser = ""; // Incorrect because it's an empty string
    const qid = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authedUser, qid, answer }),
    ).rejects.toThrow();
  });
});

import { describe, it, expect } from "vitest";
import { _saveQuestion } from "../utils/_DATA";

describe("_saveQuestion", () => {
  it("should return the saved question with all expected fields populated", async () => {
    const newQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "johndoe",
    };

    const expectedQuestion = {
      author: "johndoe",
      optionOne: {
        votes: [],
        text: "Option One",
      },
      optionTwo: {
        votes: [],
        text: "Option Two",
      },
    };

    const promise = _saveQuestion(newQuestion);
    await expect(promise).resolves.to.deep.include(expectedQuestion);
  });
  it("should reject with an error if incorrect data is passed", async () => {
    const incompleteQuestion = {
      optionOneText: "Option One",
      // optionTwoText is missing
      author: "johndoe",
    };

    await expect(_saveQuestion(incompleteQuestion)).rejects.toEqual({
      type: "optionTwoText",
      message: "Please provide optionTwoText",
    });
  });
});

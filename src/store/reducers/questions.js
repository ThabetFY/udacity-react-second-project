import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION: {
      console.log(state);
      return {
        ...state,
        [action.question.id]: action.question,
      };
    }

    case ADD_QUESTION_ANSWER: {
      const answeredOptionOne = state[action.qid].optionOne.votes.includes(
        action.authedUser,
      );
      const answeredOptionTwo = state[action.qid].optionTwo.votes.includes(
        action.authedUser,
      );

      // Reset the old answer
      if (answeredOptionOne) {
        state[action.qid].optionOne.votes = state[
          action.qid
        ].optionOne.votes.filter((user) => user !== action.authedUser);
      } else if (answeredOptionTwo) {
        state[action.qid].optionTwo.votes = state[
          action.qid
        ].optionTwo.votes.filter((user) => user !== action.authedUser);
      }

      // Add the new answer
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    }

    default:
      return state;
  }
}

import { saveQuestion, saveQuestionAnswer } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(firstOption, secondOption) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    const question = {
      optionOneText: firstOption,
      optionTwoText: secondOption,
      author: authedUser,
    };

    return saveQuestion(question).then((question) => {
      dispatch(addQuestion(question));
      dispatch(hideLoading());
    });
  };
}

function addQuestionAnswer(authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddQuestionAnswer(qid, answer) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    dispatch(addQuestionAnswer(authedUser, qid, answer));

    return saveQuestionAnswer({
      qid,
      answer,
      authedUser,
    }).then(() => dispatch(hideLoading()));
  };
}

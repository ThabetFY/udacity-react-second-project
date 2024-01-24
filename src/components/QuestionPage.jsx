import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { formatDate } from "../utils/helpers";
import { handleAddQuestionAnswer } from "../store/actions/questions";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
function QuestionPage({ dispatch, question }) {
  const [option, setOption] = useState("");

  useEffect(() => {
    setOption(question.votedOption);
  }, [question.votedOption]);

  if (question === null) {
    return <p>{`This Question doesn't existd`}</p>;
  }

  const { id, avatar, name, timestamp, optionOneText, optionTwoText } =
    question;

  const selectHanlder = (e) => {
    e.preventDefault();

    setOption(option);

    dispatch(handleAddQuestionAnswer(id, e.target.value));
  };

  return (
    <div>
      <h1> {`Poll by ${name}`}</h1>
      <img src={avatar} alt={`Avatar of ${name}`} />
      <div>{formatDate(timestamp)}</div>
      <div>
        <h1>Would You Rather</h1>
        <div
          style={{
            backgroundColor: option === "optionOne" ? "Green" : "",
          }}
        >
          <h2>{optionOneText}</h2>
          <button onClick={selectHanlder} value={"optionOne"}>
            Click
          </button>
        </div>
        <div
          style={{
            backgroundColor: option === "optionTwo" ? "Green" : "",
          }}
        >
          <h2>{optionTwoText}</h2>
          <button onClick={selectHanlder} value={"optionTwo"}>
            Click
          </button>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const avatar = users[question.author].avatarURL;
  const name = users[question.author].name;
  const timestamp = question.timestamp;
  const votedOption = question.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : question.optionTwo.votes.includes(authedUser)
    ? "optionTwo"
    : null;
  const optionOneText = question.optionOne.text;
  const optionTwoText = question.optionTwo.text;

  return {
    question: {
      id: question.id,
      avatar,
      name,
      timestamp,
      votedOption,
      optionOneText,
      optionTwoText,
    },
  };
};

QuestionPage.propTypes = {
  dispatch: PropTypes.func,
  question: PropTypes.object,
};

const connectedQuestionPage = withRouter(
  connect(mapStateToProps)(QuestionPage)
);
export default connectedQuestionPage;

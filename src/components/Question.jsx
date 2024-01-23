import { useNavigate } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { formatDate } from "../utils/helpers";

const Question = ({ question }) => {
  const navigate = useNavigate();

  const toQuestion = (event, id) => {
    event.preventDefault();
    navigate(`/question/${id}`);
  };

  if (question === null) {
    return <p>{`This Tweet doesn't existd`}</p>;
  }

  const { id, avatar, name, timestamp } = question;

  return (
    <div onClick={(e) => toQuestion(e, id)}>
      <span>{name}</span>
      <img src={avatar} alt={`Avatar of ${name}`} />
      <div>{formatDate(timestamp)}</div>
    </div>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id];
  const avatar = users[question.author].avatarURL;
  const name = users[question.author].name;
  const timestamp = question.timestamp;

  return {
    question: {
      id,
      avatar,
      name,
      timestamp,
    },
  };
};

Question.propTypes = {
  question: PropTypes.object,
  id: PropTypes.string.isRequired,
};

const connectedQuestion = connect(mapStateToProps)(Question);

export default connectedQuestion;

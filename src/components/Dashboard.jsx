import { connect } from "react-redux";
import PropTypes from "prop-types";

import Question from "./Question";

const Dashboard = ({ doneQuestion, newQuestion }) => {
  return (
    <div>
      <div>
        <h1>New Questions</h1>
        <br />
        <ul>
          {newQuestion.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Done</h1>
        <br />
        <ul>
          {doneQuestion.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => {
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const doneQuestion = questionIds.filter(
    (id) =>
      questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser)
  );
  const newQuestion = questionIds.filter(
    (id) =>
      !questions[id].optionOne.votes.includes(authedUser) &&
      !questions[id].optionTwo.votes.includes(authedUser)
  );

  return {
    doneQuestion,
    newQuestion,
  };
};

Dashboard.propTypes = {
  doneQuestion: PropTypes.array.isRequired,
  newQuestion: PropTypes.array.isRequired,
};

const connectedDashboard = connect(mapStateToProps)(Dashboard);

export default connectedDashboard;

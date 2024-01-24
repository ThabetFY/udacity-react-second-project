import { connect } from "react-redux";
import PropTypes from "prop-types";

import Question from "./Question";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Dashboard = ({ doneQuestion, newQuestion }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <Card className="text-center flex-grow size-full space-y-4">
        <CardHeader>
          <CardTitle>New Questions</CardTitle>
          <CardDescription>
            Here you find the questions that you have not voted
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-wrap gap-4 ">
          {newQuestion.map((id) => (
            <Question key={id} id={id} />
          ))}
        </CardContent>
      </Card>
      <Card className="text-center flex-grow size-full space-y-4">
        <CardHeader>
          <CardTitle>Done</CardTitle>
          <CardDescription>
            Here you find the questions that you have voted
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-wrap gap-4">
          {doneQuestion.map((id) => (
            <Question key={id} id={id} />
          ))}
        </CardContent>
      </Card>
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

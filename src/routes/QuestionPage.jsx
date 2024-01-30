import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { handleAddQuestionAnswer } from "../store/actions/questions";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Progress } from "@/components/ui/progress";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

function QuestionPage({ dispatch, question }) {
  const [option, setOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!question) {
      navigate("*");
    }
    setOption(question ? question.votedOption : "");
  }, [question, navigate]);

  if (!question) {
    navigate("/login");
    return;
  }

  const {
    id,
    avatar,
    name,
    optionOneText,
    optionTwoText,
    totalVotes,
    optionOneVotes,
    optionTwoVotes,
    optionOnePercentage,
    optionTwoPercentage,
  } = question;

  const selectHandler = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(id, e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <Label className="text-lg font-bold">{`Poll by ${name}`}</Label>
      <Avatar className="w-64 h-64 m-8">
        <AvatarImage src={avatar} alt={`Avatar of ${name}`} />
        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <Label className="text-lg font-bold">Would You Rather</Label>
      <Label className="border-b bg-secondary p-2 rounded-md font-semibold">{`${totalVotes} people voted `}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
        <Card className=" space-y-4">
          <CardContent className="p-6">
            <Label className="text-base font-bold">{optionOneText}</Label>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button
              onClick={selectHandler}
              value={"optionOne"}
              className="w-full font-bold"
              disabled={option === "optionOne"}
            >
              Choose Option One
            </Button>
          </CardFooter>
        </Card>
        <Card className="space-y-4">
          <CardContent className=" p-6 space-y-10">
            <Label className="text-base font-bold">{optionTwoText}</Label>
          </CardContent>
          <Separator />
          <CardFooter>
            <Button
              onClick={selectHandler}
              value={"optionTwo"}
              className="w-full font-bold"
              disabled={option === "optionTwo"}
            >
              Choose Option Two
            </Button>
          </CardFooter>
        </Card>
        {option && (
          <>
            <div className="flex flex-col gap-4 p-4 rounded-md bg-secondary">
              <Label className="font-bold">{`${optionOnePercentage}%`}</Label>
              <Progress value={optionOnePercentage} />
              <Separator className="bg-primary" />
              <Label className="font-bold">{`${optionOneVotes} people agree with you`}</Label>
            </div>

            <div className="flex flex-col gap-4  p-4 rounded-md bg-secondary">
              <Label className="font-bold">{`${optionTwoPercentage}%`}</Label>
              <Progress value={optionTwoPercentage} />
              <Separator className="bg-primary" />
              <Label className="font-bold">{`${optionTwoVotes} people agree with you`}</Label>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

QuestionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    votedOption: PropTypes.string,
    optionOneText: PropTypes.string,
    optionTwoText: PropTypes.string,
    totalVotes: PropTypes.number,
    optionOneVotes: PropTypes.number,
    optionTwoVotes: PropTypes.number,
    optionOnePercentage: PropTypes.number,
    optionTwoPercentage: PropTypes.number,
  }),
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  if (!question) {
    return {
      question: null,
    };
  }
  const avatar = users[question.author].avatarURL;
  const name = users[question.author].name;
  const votedOption = question.optionOne.votes.includes(authedUser)
    ? "optionOne"
    : question.optionTwo.votes.includes(authedUser)
      ? "optionTwo"
      : null;
  const optionOneText = question.optionOne.text;
  const optionTwoText = question.optionTwo.text;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = Math.round((optionOneVotes / totalVotes) * 100);
  const optionTwoPercentage = Math.round((optionTwoVotes / totalVotes) * 100);

  return {
    question: {
      id: question.id,
      avatar,
      name,
      votedOption,
      optionOneText,
      optionTwoText,
      totalVotes,
      optionOneVotes,
      optionTwoVotes,
      optionOnePercentage,
      optionTwoPercentage,
    },
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));

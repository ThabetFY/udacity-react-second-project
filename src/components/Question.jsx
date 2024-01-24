import { useNavigate } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { formatDate } from "../utils/helpers";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Question = ({ question }) => {
  const navigate = useNavigate();

  const toQuestion = (event, id) => {
    event.preventDefault();
    navigate(`/question/${id}`);
  };

  if (question === null) {
    return <p>{`This Question doesn't existd`}</p>;
  }

  const { id, avatar, name, timestamp } = question;

  return (
    <Card className="space-y-4">
      <CardContent className="flex flex-col items-center justify-between ">
        <Avatar className="w-16 h-16 m-4">
          <AvatarImage src={avatar} alt={`Avatar of ${name}`} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p className="text-lg">{name}</p>
        <Separator />
        <p className="text-muted-foreground">{formatDate(timestamp)}</p>
      </CardContent>
      <Separator />
      <CardFooter>
        <Button onClick={(e) => toQuestion(e, id)} className="w-full">
          Show
        </Button>
      </CardFooter>
    </Card>
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
};

const connectedQuestion = connect(mapStateToProps)(Question);

export default connectedQuestion;

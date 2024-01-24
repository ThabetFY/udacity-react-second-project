import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { handleAddQuestion } from "../store/actions/questions";

const NewQuestion = ({ dispatch }) => {
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "firstOption") {
      setFirstOption(event.target.value);
    } else if (event.target.name === "secondOption") {
      setSecondOption(event.target.value);
    }
  };

  const handleBlur = (event) => {
    event.preventDefault();
    if (event.target.name === "firstOption") {
      if (event.target.value === "") {
        setError("First Option is required");
      } else {
        setError("");
      }
    } else if (event.target.name === "secondOption") {
      if (event.target.value === "") {
        setError("Second Option is required");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (firstOption === "" || secondOption === "") {
      setError("Both options are required");
      return;
    }
    dispatch(handleAddQuestion(firstOption, secondOption))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Option:</label>
      <input
        type="text"
        name="firstOption"
        placeholder="Enter First Option"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <label>Second Option:</label>
      <input
        type="text"
        name="secondOption"
        placeholder="Enter Second Option"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <br />
      <input type="submit" value="Submit" />
      {error && (
        <p
          style={{
            color: "red",
            fontSize: "1.2rem",
            margin: "1rem 0",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
};

NewQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const connectedNewQuestion = connect()(NewQuestion);

export default connectedNewQuestion;

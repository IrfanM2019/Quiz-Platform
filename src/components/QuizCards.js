import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { addResult } from "../Store/Slices/TestInfo";
import { useNavigate } from "react-router-dom";
import "../styles/QuizCards.css";

const commonStyles = {
  bgcolor: "background.paper",
  my: 2,
  borderColor: "text.primary",
  width: "100%",
};

const QuizCards = () => {
  const users = useSelector((state) => state.users);
  const testDetails = useSelector((state) => state.testdetails);
  // console.log(testDetails);

  let questions = users.filter((user) => user.checked === true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [ansresult, setansresult] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    let clickedans = questions[questionIndex].answer;
    let rightans = questions[questionIndex].options[answerIndex];
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setIsOptionSelected(true);

    if (clickedans === rightans) {
      setansresult(ansresult + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsOptionSelected(false);
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      dispatch(addResult(ansresult));

      navigate("/Result");
    }
  };

  return (
    <>
      <Grid xs={12}>
        <Paper>
          <Typography
            sx={{ fontSize: 44, ml: 5 }}
            color="text.primary"
            gutterBottom
          >
            {testDetails[0].name}
          </Typography>
        </Paper>
      </Grid>

      <Card sx={{ minWidth: 275, mx: 15, px: 5, py: 2, my: 10 }}>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          <h2>{questions[activeQuestion].title}</h2>
        </Typography>

        <Box sx={{ ...commonStyles, borderBottom: 1 }} />
        <Grid container>
          <Grid xs={10}>
            <Paper
              sx={{ p: 3 }}
              style={{
                padding: "16px",
                margin: "0.5rem 0",
                border: "1px solid #e0e0e0",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 5)",
                paddingBottom: "1rem",
              }}
            >
              <h2>
                {activeQuestion + 1}.{questions[activeQuestion].question}
              </h2>
            </Paper>
          </Grid>
          {questions[activeQuestion].options.map((option, index) => (
            <Grid
              md={6}
              sm={12}
              xs={12}
              key={index}
              className="gridin"
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Paper
                style={{
                  padding: "16px",
                  margin: "0.5rem 0",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  paddingBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="Checkbox"
                    name={`question_${activeQuestion}`}
                    value={index}
                    checked={selectedAnswers[activeQuestion] === index}
                    onChange={() => handleAnswerSelect(activeQuestion, index)}
                  />
                  <div style={{ margin: "0.5rem" }}>{option}</div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid>
          <Grid sx={{ m: 1 }}>
            <h3>
              Question{activeQuestion + 1} / {questions.length}
            </h3>
          </Grid>

          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={!isOptionSelected}
            >
              {activeQuestion + 1 === questions.length
                ? "Submit"
                : "Next Question"}
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </>
  );
};

export default QuizCards;

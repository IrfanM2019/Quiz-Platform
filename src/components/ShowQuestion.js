import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const commonStyles = {
  bgcolor: "background.paper",
  my: 2,
  borderColor: "text.primary",
  width: "100%",
};

const ShowQuestion = () => {
  const questions = useSelector((state) => state.users);
  const navigate = useNavigate();

  const [activeQuestion, setActiveQuestion] = useState(0);

  const handleNextQuestion = () => {
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      navigate("/MyQuiz");
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275, mx: 15, px: 5, py: 2, my: 10 }}>
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          <h2>{questions[activeQuestion].title}</h2>
        </Typography>

        <Box sx={{ ...commonStyles, borderBottom: 1 }} />
        <Grid container>
          <Grid xs={10}>
            <Paper sx={{ p: 3 }}>
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
                  backgroundColor:
                    questions[activeQuestion].answer === option
                      ? "green"
                      : option === questions[activeQuestion].answer
                      ? "red"
                      : "gray",
                  color:
                    questions[activeQuestion].answer === option
                      ? "white"
                      : option === questions[activeQuestion].answer
                      ? "white"
                      : "black",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {option}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Grid>
          <Grid sx={{ m: 1 }}>
            <h2 style={{ color: "green" }}>
              Correct Answer: {questions[activeQuestion].answer}
            </h2>
            <h3>
              Question {activeQuestion + 1} / {questions.length}
            </h3>
          </Grid>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              {activeQuestion + 1 === questions.length
                ? " Go to MyQuiz"
                : "Next Question"}
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </>
  );
};

export default ShowQuestion;

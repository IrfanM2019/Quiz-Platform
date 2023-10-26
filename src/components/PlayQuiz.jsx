import React, { useState } from "react";
import Header from "./layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { addName } from "../Store/Slices/TestInfo";
import { Grid } from "@mui/material";
import "../styles/PlayQuizStyle.css";

const PlayQuiz = () => {
  const users = useSelector((state) => state.users);
  let questions = users.filter((user) => user.checked === true);
  console.log(questions.length);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isnameEntered, setisnameEntered] = useState(false);
  const [Nameofuser, setNameofuser] = useState("");

  const handleNameChange = (e) => {
    setNameofuser(e.target.value);
    setisnameEntered(true);
  };

  const savename = () => {
    if (Nameofuser) {
      setisnameEntered(true);
      dispatch(addName(Nameofuser));
      navigate("/QuizCards");
    }
  };

  return (
    <>
      {questions.length > 0 ? (
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Header />
          <Grid
            xs={10}
            md={6}
            sx={{ mb: 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Card sx={{ minWidth: 275, p: 4 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 24 }}
                  color="text.primary"
                  gutterBottom
                >
                  {users[0].title}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Error, architecto ullam! Accusamus, quod! Quis iusto saepe,
                  vero sit debitis quidem.
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Enter Your Name
                  <br />
                  <TextField
                    label="Question"
                    variant="outlined"
                    required
                    value={Nameofuser}
                    onChange={handleNameChange}
                  />
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  sx={{ ml: 1 }}
                  color="success"
                  disabled={!isnameEntered}
                  onClick={savename}
                >
                  <PlayCircleOutlineIcon sx={{ mr: 1 }} />
                  Start
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h1> There is not a single Active Question for Quiz</h1>
        </div>
      )}
    </>
  );
};

export default PlayQuiz;

import React from "react";
import Header from "../components/layout/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardMedia, Grid } from "@mui/material";
import "../styles/ResultStyle.css";

const Result = () => {
  const users = useSelector((state) => state.users);
  const testDetails = useSelector((state) => state.testdetails);
  let questions = users.filter((user) => user.checked === true);

  return (
    <Grid
      container
      spacing={2}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        xs={12}
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
        <Header />
        <Card sx={{ minWidth: 575 }} className="resultcontainer">
          <CardMedia
            component="img"
            height="240"
            image="https://plus.unsplash.com/premium_photo-1682309819424-bbb85f555d7d?auto=format&fit=crop&q=80&w=1512&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          ></CardMedia>
          <CardContent sx={{ ml: 10 }}>
            <Typography variant="body2">
              <h1>
                You Scored {testDetails[0].result} out of {questions.length}
              </h1>
            </Typography>
          </CardContent>
          <CardActions sx={{ ml: 25 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/PlayQuiz"
            >
              Play Again
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Result;

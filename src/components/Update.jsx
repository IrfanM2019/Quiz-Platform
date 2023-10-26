import React, { useState } from "react";
import Header from "./layout/Header";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { updateUser } from "../Store/Slices/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Alert from "@mui/material/Alert";
import "../styles/MyQuizStyle.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Update() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const { id } = useParams();
  const existingUser = users.find((user) => user.id === id);
  const { title, question, answer, options } = existingUser;
  let opt = options.map((text) => ({ text }));

  const [utitle, setTitle] = useState(title);
  const [uquestion, setQuestion] = useState(question);
  const [uoptions, setOptions] = useState(opt);

  const [ucorrectAnswer, setCorrectAnswer] = useState(
    options.findIndex((text) => text === answer)
  );

  function CreatedOn() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours() % 12 || 12;
    const minutes = currentDate.getMinutes();
    const amOrPm = currentDate.getHours() >= 12 ? "PM" : "AM";
    const formattedDateTime = ` ${day}  ${monthName} - ${year} - ${hours}:${
      (minutes < 10 ? "0" : "") + minutes
    } ${amOrPm}`;

    return formattedDateTime;
  }

  const removeOption = (index) => {
    const updatedOptions = [...uoptions];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (utitle.length < 10 || utitle.length > 30) {
      alert(
        "Title should be minimum of 10 characters and maximum of 30 characters"
      );
      return;
    }

    if (uquestion.length < 10 || uquestion.length > 200) {
      alert(
        "Question should be minimum of 10 characters and maximum of 200 characters"
      );
      return;
    }

    if (uoptions.length < 2) {
      alert("Please provide  atleast 2 options.");
      return;
    }

    if (ucorrectAnswer === "") {
      alert("Please Chose Correct Answer options.");
      return;
    }

    const questionData = {
      id: id,
      date: CreatedOn(),
      title: utitle,
      question: uquestion,
      options: uoptions.map((option) => option.text),
      answer: uoptions[ucorrectAnswer].text,
    };

    dispatch(updateUser(questionData));

    return handleOpen();
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="formcol">
        <Grid container spacing={1}>
          <Grid xs={4} md={4} sx={{ mb: 2 }}>
            <Paper>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={utitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid xs={12}>
            <Paper>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                required
                value={uquestion}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Paper>
          </Grid>

          {uoptions.map((option, index) => (
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
                  margin: "8px 0",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  Correct Answer
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    checked={ucorrectAnswer === index}
                    onChange={() => setCorrectAnswer(index)}
                  />
                  <TextField
                    required
                    fullWidth
                    id={`option${index + 1}`}
                    label={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => {
                      const updatedOptions = [...uoptions];
                      updatedOptions[index].text = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  />
                  <Button
                    color="error"
                    onClick={() => removeOption(index)}
                    style={{ marginLeft: "8px" }}
                  >
                    Remove
                    <DeleteForeverIcon sx={{ ml: 1 }} />
                  </Button>
                </div>
              </Paper>
            </Grid>
          ))}

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              <SaveAltIcon sx={{ mr: 1 }} />
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modalbox">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            <Alert variant="outlined" severity="success">
              Question Updated successfully
            </Alert>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/ShowQuestion`}
          >
            View all questions
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ ms: 2, float: "right" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

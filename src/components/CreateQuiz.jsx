import React, { useState } from "react";
import Header from "./layout/Header";
import { Box, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import { addUser } from "../Store/Slices/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "../styles/MyQuizStyle.css";
import Modal from "@mui/material/Modal";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Alert from "@mui/material/Alert";

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

export default function CreateQuiz() {
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

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [user, setuser] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "" }]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { text: "" }]);
    } else {
      alert("You cannot add more then 4 Options");
    }
  };

  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.length < 10 || title.length > 30) {
      alert(
        "Title should be minimum of 10 characters and maximum of 30 characters"
      );
      return;
    }
    if (user.length < 5 || user.length > 50) {
      alert(
        "User Name should be minimum of 5 characters and maximum of 50 characters"
      );
      return;
    }

    if (question.length < 10 || question.length > 200) {
      alert(
        "Question should be minimum of 10 characters and maximum of 200 characters"
      );
      return;
    }

    if (options.length < 2) {
      alert("Please provide  atleast 2 options.");
      return;
    }
    if (correctAnswer === "") {
      alert("Please Chose Correct Answer options.");
      return;
    }

    const questionData = {
      id: users.length + 1,
      date: CreatedOn(),
      user,
      title,
      question,
      options: options.map((option) => option.text),
      answer: options[correctAnswer].text,
      checked: true,
    };

    dispatch(addUser(questionData));

    return handleOpen();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const newquiz = () => {
    setTitle("");
    setuser("");
    setQuestion("");
    setOptions([{ text: "" }]);
    setCorrectAnswer("");
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="formcol">
        <Grid container spacing={2}>
          <Grid xs={4} md={4} sx={{ mb: 1 }}>
            <Paper
              style={{
                padding: "16px",
                marginBottom: "16px",
                border: "1px solid #e0e0e0",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F0F0F0",
              }}
            >
              <TextField
                label="Please Enter User Name"
                variant="outlined"
                fullWidth
                required
                value={user}
                onChange={(e) => setuser(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid xs={8} md={8}>
            <Button
              variant="contained"
              color="success"
              sx={{ ms: 1, float: "right" }}
              onClick={newquiz}
            >
              <AddCircleOutlineIcon />
              Add New Question
            </Button>
          </Grid>

          <Grid xs={4} md={4} sm={4} sx={{ mb: 1 }}>
            <Paper
              style={{
                padding: "16px",
                marginBottom: "16px",
                border: "1px solid #e0e0e0",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F0F0F0",
              }}
            >
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid
            xs={6}
            md={8}
            sx={{ my: 1, float: "right", textAlign: "right" }}
          >
            <h2>Question No {users.length + 1}</h2>
          </Grid>

          <Grid xs={12}>
            <Paper
              style={{
                padding: "16px",
                marginBottom: "16px",
                border: "1px solid #e0e0e0",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F0F0F0",
              }}
            >
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Paper>
          </Grid>
          <Grid xs={12} md={12} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ ms: 2, float: "right" }}
              onClick={addOption}
            >
              <AddCircleOutlineIcon sx={{ mr: 1 }} />
              Add Option
            </Button>
          </Grid>

          {options.map((option, index) => (
            <Grid
              md={6}
              sm={12}
              xs={12}
              key={index}
              className="gridin"
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Paper
                style={{
                  padding: "16px",
                  margin: "1rem 2rem",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  Correct Answer
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    checked={correctAnswer === index}
                    onChange={() => setCorrectAnswer(index)}
                  />
                  <TextField
                    fullWidth
                    required
                    id={`option${index + 1}`}
                    label={`Option ${index + 1}`}
                    value={option.text}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[index].text = e.target.value;
                      setOptions(updatedOptions);
                    }}
                  />
                  <Button color="error" onClick={() => removeOption(index)}>
                    Delete this option
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
              Question created successfully
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

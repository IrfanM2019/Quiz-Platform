import React, { useState } from "react";
import { addUser } from "../Store/Slices/UserReducer";
// import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Below is the new create import
// import Layout from "../components/layout/Layout";
import { Box, Button, TextField } from "@mui/material";

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const Create = () => {
  // const [name, setName] = useState(); // this will be not in use
  const [title, settitle] = useState();
  const [question, setquestion] = useState(); // This is newly made by me
  const [option1, setoption1] = useState();
  const [option2, setoption2] = useState();
  const [answer, setanswer] = useState();
  // Date and Time code
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

  // const [email, setEmail] = useState(); // this will be not in use

  const users = useSelector((state) => state.users);
  console.log(users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addUser({
        id: users.length <= 0 ? 1 : users[users.length - 1].id + 1,
        date: CreatedOn(),
        checked: "Inactive",
        title,
        question,
        option1,
        option2,
        answer,
      })
    );
    navigate("/");
  };

  return (
    <>
      {/* <Layout>
      <h1>This is CreateNewQuiz page</h1>
      <Box sx={{ p: 5 }}>
        <TextField
          onChange={(e) => settitle(e.target.value)}
          id="outlined-basic"
          label="Please Enter the Title"
          variant="outlined"
          sx={{
            m: 1,
          }}
        />

        <TextField
          onChange={(e) => setquestion(e.target.value)}
          fullWidth
          label="Plese Enter your Question here"
          id="fullWidth"
        />

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl>
            <InputLabel htmlFor="component-outlined">Option1</InputLabel>
            <OutlinedInput id="component-outlined" label="Name" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-outlined">Option2</InputLabel>
            <OutlinedInput id="component-outlined" label="Name" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-outlined">Option3</InputLabel>
            <OutlinedInput id="component-outlined" label="Name" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="component-outlined">Option4</InputLabel>
            <OutlinedInput id="component-outlined" label="Name" />
          </FormControl>
        </Box>

        <Button variant="contained" color="primary" sx={{ m: 2 }}>
          Add the Question for test
        </Button>

        <br />
        <Button variant="contained" color="primary" sx={{ m: 2 }}>
          Save
        </Button>

        <br />
        {/* <Button>Delete All Question for test</Button> }
      </Box> */}
      {/* </Layout> */}
      {/* Old code is below */}
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3>Add New Users</h3>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Title:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Your Title"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Question</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => setquestion(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Option1 </label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => setoption1(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Option2 </label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => setoption2(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Answer </label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter Your Email Address"
                onChange={(e) => setanswer(e.target.value)}
              />
            </div>

            <br />
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;

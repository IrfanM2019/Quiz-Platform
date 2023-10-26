import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { deleteUser } from "../Store/Slices/UserReducer";
import { deleteUser, updateToggle } from "../Store/Slices/UserReducer";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
// import { Typography } from "@mui/material";
import { FormControlLabel, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

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

const Home = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (id) => {
    setChecked(!checked);
    dispatch(updateToggle({ id: id, checked: !checked }));
  };

  // Below code is for toggle-enable and disable on the first page  ********************
  // const [checked, setChecked] = React.useState(true);
  // Here dispacthc line should come as we are dispatching in data file ef;->dispatch(deleteUser({ id }));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const navigate = useNavigate();

  const handleDelete = (id) => {
    // This function is to delete item from home page and data page
    dispatch(deleteUser({ id }));
    setSelectedUserId(null); // Reset selected user ID
    handleClose();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedUserId(null);
    setOpen(false);
  };

  return (
    <>
      <div className="container">
        <h1>This is my Homepage </h1>
        <h2>Crud App with JSON Server</h2>
        <Link to="/create" className="btn btn-success my-3 mx-3">
          Create +
        </Link>
        <Link to="/MyQuiz" className="btn btn-success my-3">
          My Quiz
        </Link>
        <table className="table">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Quiz No</th>
              {/* <th>Name</th> */}
              <th>Title</th>
              {/* <th>Email</th> */}
              {/* <th>Status</th> */}
              <th>Created on</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.checked} // Assuming that your user data has a 'checked' property
                        onChange={() => handleSwitchChange(user.id)}
                        name={`switche-${user.id}`}
                        color="primary"
                      />
                    }
                    // label="Status"
                  />
                </td>

                <td>{user.date}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleOpen(user.id)} // Pass user.id to handleOpen
                    className="btn btn-sm btn-danger ms-2 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              Are you sure you want to delete this user?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(selectedUserId)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ ms: 2 }}
              onClick={handleClose}
            >
              Do Not Delete
            </Button>
          </Box>
        </Modal>
      </div>

      <hr />
      <br />
      {/* From here new code is starting for the question visiual */}
    </>
  );
};

export default Home;

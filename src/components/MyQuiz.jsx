import React from "react";
import Header from "./layout/Header";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"; //  This is delete icon from material ui
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, updateToggle } from "../Store/Slices/UserReducer";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import "../styles/MyQuizStyle.css";
import Card from "@mui/material/Card";

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

const MyQuiz = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (id) => {
    setChecked(!checked);
    dispatch(updateToggle({ id: id, checked: !checked }));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
    setSelectedUserId(null);
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
      <Header />

      <div className="container">
        <Card sx={{ minWidth: 275, p: 5, color: "red" }}>
          <div>
            <Button
              className="crb"
              variant="contained"
              color="success"
              component={Link}
              to={`/CreateQuiz`}
            >
              Create New Quiz
            </Button>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Quiz No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.title}</TableCell>
                  <TableCell>
                    {user.checked ? "Active" : "Inactive"}{" "}
                    {
                      <Switch
                        checked={user.checked}
                        onChange={() => handleSwitchChange(user.id)}
                        name={`switche-${user.id}`}
                        color="primary"
                      />
                    }
                  </TableCell>

                  <TableCell>{user.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/edit/${user.id}`}
                    >
                      <EditNoteIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpen(user.id)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
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
              color="success"
              sx={{ mr: 20 }}
              onClick={handleClose}
            >
              Do Not Delete
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(selectedUserId)}
            >
              Delete
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default MyQuiz;

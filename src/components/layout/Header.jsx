import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Divider,
} from "@mui/material";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import "../../styles/HeaderStyle.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      ></Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeclassname="active" to={"/"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/CreateQuiz"}>Create New Quiz</NavLink>
        </li>
        <li>
          <NavLink to={"/MyQuiz"}>My Quiz</NavLink>
        </li>
        <li>
          <NavLink to={"/PlayQuiz"}>Play Quiz</NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open-drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component={"div"}
              sx={{ flexGrow: 1 }}
            >
              <QuizTwoToneIcon />
              Quiz - Platform
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeclassname="active" to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/CreateQuiz"}>Create New Quiz</NavLink>
                </li>
                <li>
                  <NavLink to={"/MyQuiz"}>My Quiz</NavLink>
                </li>
                <li>
                  <NavLink to={"/PlayQuiz"}>Play Quiz</NavLink>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;

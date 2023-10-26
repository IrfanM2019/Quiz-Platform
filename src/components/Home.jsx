import Layout from "./layout/Layout";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, React } from "react";
import Modal from "@mui/material/Modal";
import "../styles/HomeStyle.css";

import { Card, CardContent, Typography, CardMedia } from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Layout>
        <div className="home">
          <div>
            <Grid container className="headerContainer">
              <Grid sm={12} md={4}>
                <Card sx={{ m: 2 }}>
                  {/* <Link to={"/Modalpopup"}> */}
                  <CardContent>
                    <CardMedia
                      component={"img"}
                      height="140"
                      image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    ></CardMedia>

                    <div>
                      <Typography gutterBottom variant="h5" component="div">
                        Create New Quiz
                      </Typography>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style} className="modalbox">
                          <Typography
                            color="primary"
                            id="modal-modal-title"
                            variant="h4"
                            component="h2"
                            sx={{ mb: 2 }}
                          >
                            Please Select Question Type
                          </Typography>

                          <Button
                            component={Link}
                            to="/CreateQuiz"
                            variant="contained"
                            color="secondary"
                            sx={{ m: 2 }}
                          >
                            MCQ
                            <p>(single correct)</p>
                          </Button>

                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ m: 2 }}
                          >
                            Short Answer
                            <p>(with 2 words)</p>
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ m: 2 }}
                          >
                            MCQ
                            <p>(multi correct)</p>
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ m: 2 }}
                          >
                            Description
                            <p>(with 2 or 4 sentences)</p>
                          </Button>
                        </Box>
                      </Modal>
                    </div>

                    <Typography onClick={handleOpen} variant="body2">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolore, mollitia!
                    </Typography>
                  </CardContent>
                  {/* </Link> */}
                </Card>
              </Grid>
              <Grid sm={12} md={4}>
                <Card sx={{ m: 2 }}>
                  <CardContent>
                    <CardMedia
                      component={"img"}
                      height="140"
                      image="https://images.unsplash.com/photo-1606326608690-4e0281b1e588?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Test Image"
                    ></CardMedia>

                    <Typography gutterBottom variant="h5" component="div">
                      My Quiz
                    </Typography>
                    <Link to={"/MyQuiz"}>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore, mollitia!
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid sm={12} md={4}>
                <Card sx={{ m: 2 }}>
                  <CardContent>
                    <CardMedia
                      component={"img"}
                      height="140"
                      image="https://plus.unsplash.com/premium_photo-1661400674151-11fd67f8b4ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Play Quiz"
                    ></CardMedia>
                    <Typography gutterBottom variant="h5" component="div">
                      Play Quiz
                    </Typography>
                    <Link to={"/PlayQuiz"}>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore, mollitia!
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

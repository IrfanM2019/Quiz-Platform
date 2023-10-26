// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// function MyQuiz() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 550 }} aria-label="simple table">
//         <TableHead className="th">
//           <TableRow>
//             <TableCell>Quiz No.</TableCell>
//             <TableCell>Title</TableCell>
//             <TableCell align="right">Status</TableCell>
//             <TableCell align="right">Created on</TableCell>
//             <TableCell align="right">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell>{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default MyQuiz;

// Above is old code not working Material UI Code *****************************************************************
// Below is code Bootstrap code *****************************************************************

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "../Store/Slices/UserReducer";
import { useState } from "react";
import Button from "@mui/material/Button";

const MyQuiz = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <Link to="/Home" className="btn btn-success my-3 mx-3">
        Home
      </Link>
      <div className="container">
        <h2>This is MyQuiz Page</h2>

        <table className="table">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Quiz No</th>
              {/* <th>Name</th> */}
              <th>Title</th>
              {/* <th>Email</th> */}
              <th>question</th>
              <th>option1</th>
              <th>option2</th>
              <th>status</th>
              <th>answer</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.question}</td>
                <td>{user.option1}</td>
                <td>{user.option2}</td>
                <td>{user.checked ? "Active" : "Inactive"}</td>
                {/* Above code is to check wheter the status of question is active or inactive */}
                <td>{user.answer}</td>
                <td>
                  <Button></Button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />
      <br />
    </>
  );
};

export default MyQuiz;

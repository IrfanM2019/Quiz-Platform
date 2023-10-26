import { createSlice } from "@reduxjs/toolkit";
// import userList from "../../DataCRUD/Data.json";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

  

    updateUser: (state, action) => {
      const { id, title, question, options, answer, date } = action.payload;
      const uu = state.find((user) => user.id == id);
      if (uu) {
        uu.date = date;
        uu.title = title;
        uu.question = question;
        uu.options = options;
        uu.answer = answer;

      }
    },
    updateToggle: (state, action) => {
      const { id, checked } = action.payload;
      const user = state.find((user) => user.id == id);
      if (user) {
        user.checked = checked;
      }
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      const uu = state.find((user) => user.id == id);

      if (uu) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});

export const { addUser, updateUser, deleteUser, updateToggle, addName } =
  userSlice.actions;

export default userSlice.reducer;

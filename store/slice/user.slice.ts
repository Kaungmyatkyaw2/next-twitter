import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialType {
  me: User | null;
}

const initialState: InitialType = {
  me: null,
};

const UserSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    storeMe: (state, action) => {
      state.me = action.payload;
    },
  },
});

export const { storeMe } = UserSlice.actions;
export default UserSlice.reducer;

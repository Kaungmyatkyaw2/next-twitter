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
    addFollowing: (state, action) => {
      state.me?.following.push(action.payload);
    },
  },
});

export const { storeMe, addFollowing } = UserSlice.actions;
export default UserSlice.reducer;

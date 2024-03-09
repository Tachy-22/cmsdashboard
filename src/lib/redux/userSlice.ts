import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

// Define a type for the slice state
export interface userState {
  user: User | null;
}

// Define the initial state using that type
const initialState: userState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => ({
      user: action.payload,
    }),
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

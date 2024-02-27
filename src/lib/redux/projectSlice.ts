import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { About, Contact, Hero, Product, Project } from "@prisma/client";

// Define a type for the slice state
export interface projectState {
  project: TProjectWithData;
}

// Define the initial state using that type
const initialState: projectState = {
  project: null,
};

export const projectSlice = createSlice({
  name: "project",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateProject: (state, action: PayloadAction<TProjectWithData>) => {
      return { project: action.payload };
    },
    updateHero: (state, action: PayloadAction<Hero>) => ({
      ...state,
      hero: action.payload,
    }),
  },
});

export const { updateProject, updateHero } = projectSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.projectSlice.value;

export default projectSlice.reducer;

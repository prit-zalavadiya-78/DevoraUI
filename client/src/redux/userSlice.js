import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    allUsers: [],
    allComponents: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setAllComponents: (state, action) => {
            state.allComponents = action.payload;
        }
    },
});

export const { setUserData, setAllUsers, setAllComponents } = userSlice.actions;

export default userSlice.reducer;
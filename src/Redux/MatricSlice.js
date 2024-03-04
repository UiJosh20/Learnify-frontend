import { createSlice } from "@reduxjs/toolkit";

const matricSlice = createSlice({
    name: 'matric',
    initialState: {
        matricNumber: null,
        name: null,
    },
    reducers: {
        setMatricNumber(state, action) {
            state.matricNumber = action.payload;
        },
        setName(state, action) {
            state.name = action.payload;
        },
    },
})

export const { setMatricNumber, setName  } = matricSlice.actions;
export default matricSlice.reducer;
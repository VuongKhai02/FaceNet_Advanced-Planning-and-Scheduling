import { createSlice } from "@reduxjs/toolkit";
import { copy, str } from "../../../utils/utils";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: {},
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        },
        updateFilter: (state, action) => {
            state.filter[action.payload.id] = action.payload.data;
        },
    },
});

const { reducer, actions } = filterSlice;
export const { setFilter, updateFilter } = actions;
export default reducer;

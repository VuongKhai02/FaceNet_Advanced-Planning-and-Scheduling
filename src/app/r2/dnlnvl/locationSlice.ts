import { createSlice } from "@reduxjs/toolkit";
import { copy, print, str } from "../../../utils/utils";

type LocationState = {
    locationSlice: Location[];
};
const initialState: LocationState = {
    locationSlice: [],
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocationSlice: (state, action) => {
            state.locationSlice = [...state.locationSlice, ...action.payload];
            print(state.locationSlice);
        },
    },
});

const { reducer, actions } = locationSlice;
export const { setLocationSlice } = actions;
export default reducer;

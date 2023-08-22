import { createSlice } from "@reduxjs/toolkit";
import { copy, str } from "../../../utils/utils";

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        popUpList: {},
        filter: [
            {
                ID: "sortByCreateDate",
                name: "Theo ngày tạo lâu nhất",
            },
        ],
    },
    reducers: {
        setUpPopUp: (state, action) => {
            if (state.popUpList[action.payload] == undefined) {
                state.popUpList[action.payload] = false;
            }
        },
        changeStatus: (state, action) => {
            state.popUpList[action.payload] = true;
        },
        changeStatusFalse: (state, action) => {
            if (state.popUpList[action.payload] == true) {
                state.popUpList[action.payload] = false;
            }
        },
    },
});

const { reducer, actions } = popupSlice;
export const { setUpPopUp, changeStatus, changeStatusFalse } = actions;
export default reducer;

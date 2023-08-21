import { createSlice } from "@reduxjs/toolkit";
import { copy, str } from "../../../utils/utils";
import _ from "lodash";

const checkIsReadyToCreateDraft = (state) => {
    if (Object.keys(state?.isInsertDraft).length == 0) return false;
    for (let key in state?.isInsertDraft) {
        if (state?.isInsertDraft[key] == false) {
            return false;
        }
    }
    return true;
};

const isDoneGetMaterialPartSlice = createSlice({
    name: "isDoneGetMaterialPart",
    initialState: {
        isInsertDraft: {},
        draftNow: false,
    },
    reducers: {
        setInsertDraft: (state, action) => {
            state.isInsertDraft[action.payload.id] = action.payload.data;
            if (checkIsReadyToCreateDraft(state)) state.draftNow = true;
        },
        offDraft: (state) => {
            state.isInsertDraft = {};
            state.draftNow = false;
        },
    },
});

const { reducer, actions } = isDoneGetMaterialPartSlice;
export const { setInsertDraft, offDraft } = actions;
export default reducer;

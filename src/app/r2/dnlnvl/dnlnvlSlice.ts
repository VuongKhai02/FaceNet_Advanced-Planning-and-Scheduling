import { createSlice } from "@reduxjs/toolkit";
import { copy } from "../../../utils/utils";
import { Dnlnvl } from "../../../jmix/entities/Dnlnvl";

const dnlnvlSlice = createSlice({
    name: "dnlnvl",
    initialState: {
        listRenderNumber: {},
        dnlnvl: Dnlnvl,
        popUpList: {},
        isInsertDraft: {},
    },
    reducers: {
        setListRenderNumber: (state, action) => {
            state.listRenderNumber = action.payload;
        },
        setListCtDnlnvl: (state, action) => {
            if (action.payload == null) state.listRenderNumber = [];
            // @ts-ignore
            else state.dnlnvl.push(action.payload);
        },
        setDnlnvl: (state, action) => {
            state.dnlnvl = copy(action.payload);
        },
        updateDnlDetail: (state, action) => {
            // // @ts-ignore
            // state.dnlnvl.dnlnvlDetails = state.dnlnvl.dnlnvlDetails.map(function (a) {
            //   return a.id === action.payload.id ? action.payload : a;
            // });
            // @ts-ignore
            for (let i = 0; i < state.dnlnvl?.dnlnvlDetails.length; i++) {
                // @ts-ignore
                if (state.dnlnvl?.dnlnvlDetails[i].id === action.payload.id) {
                    // @ts-ignore
                    state.dnlnvl.dnlnvlDetails[i] = action.payload;
                    return;
                }
            }
        },
        setStillNeedProgramming: (state, action) => {
            // if (action.payload) {
            // @ts-ignore
            if (state.dnlnvl?.dnlnvlDetails) {
                // @ts-ignore
                state.dnlnvl.dnlnvlDetails = state.dnlnvl?.dnlnvlDetails?.map(function (a) {
                    if (a.id === action.payload.programmingDetailId) {
                        let result = copy(a);
                        result.stillNeed = action.payload.stillNeed;
                        return result;
                    } else return a;
                });
            }
        },
        setDnlnvlDetailDetail: (state, action) => {
            // @ts-ignore
            state.dnlnvl?.dnlnvlDetails?.map(function (a) {
                if (a.id === action.payload.id) {
                    a.dnlnvlDetailDetailList = action.payload.data;
                }
            });
        },

        // setUpPopUp: (state, action) => {
        //   if (state.hello[action.payload] == undefined) {
        //     state.hello[action.payload] = false;
        //   }
        // }
        //
    },
});

const { reducer, actions } = dnlnvlSlice;
export const {
    setListRenderNumber,
    setListCtDnlnvl,
    setDnlnvl,
    updateDnlDetail,
    setStillNeedProgramming,
    setDnlnvlDetailDetail,

    // setUpPopUp
} = actions;
export default reducer;

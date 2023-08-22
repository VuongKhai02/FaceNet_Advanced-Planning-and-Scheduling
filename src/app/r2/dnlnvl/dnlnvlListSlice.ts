import { PlanningWorkOrder } from "./../../../jmix/entities/PlanningWorkOrder";
import { collection } from "@haulmont/jmix-react-core";
import { toJS } from "mobx";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { Dnlnvl } from "./../../../jmix/entities/Dnlnvl";

interface DnlnvlListState {
    status: "idle" | "loading" | "failed";
    dnlnvlList: Dnlnvl[];
    planningWorkOrderFilter: PlanningWorkOrder;
}

const initState: DnlnvlListState = {
    dnlnvlList: [],
    status: "idle",
    planningWorkOrderFilter: {},
};

const dnlnvlCollection = collection<Dnlnvl>(Dnlnvl.NAME, {
    view: "with-work-order",
    loadImmediately: false,
    sort: "+status,-createdAt",
});

export const dnlnvlListSlice = createSlice({
    name: "dnlnvlList",
    initialState: initState,
    reducers: {
        filterDnlnvlList: (state, action) => {
            state.planningWorkOrderFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDnlnvlList.fulfilled, (state, action) => {
                state.status = "idle";
                state.dnlnvlList = action.payload;
            })
            .addCase(fetchDnlnvlList.rejected, (state, action) => {
                state.status = "failed";
                // console.log("Error: ", action.error);
            })
            .addCase(fetchDnlnvlList.pending, (state, action) => {
                // console.log("Pending");
                state.status = "loading";
            });
    },
});

export const fetchDnlnvlList = createAsyncThunk("dnlnvlList/fetchDnlnvlList", async () => {
    await dnlnvlCollection.load();
    const data = toJS(dnlnvlCollection.items);
    return data;
});
export const { filterDnlnvlList } = dnlnvlListSlice.actions;

export const selectDnlnvlList = (state: RootState) => state.dnlnvlList.dnlnvlList;
export const selectDnlnvlListStatus = (state: RootState) => state.dnlnvlList.status;
export const selectPlanningWorkOrderFilter = (state: RootState) => state.dnlnvlList.planningWorkOrderFilter;
export const selectDnlnvlListFilter = createSelector(
    selectDnlnvlList,
    selectPlanningWorkOrderFilter,
    (dnlnvlList, planningWorkOrderFilter) => {
        if (!planningWorkOrderFilter.id) {
            return dnlnvlList;
        }
        return dnlnvlList.filter((dnlnvl) => {
            return dnlnvl.planningWorkOrder?.id === planningWorkOrderFilter.id;
        });
    },
);

export default dnlnvlListSlice.reducer;

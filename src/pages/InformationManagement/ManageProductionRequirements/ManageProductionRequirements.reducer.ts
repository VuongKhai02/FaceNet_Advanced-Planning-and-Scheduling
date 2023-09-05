import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

import { ProductionRequirementsService } from './../../../services'
import { ProductionRequirement } from './../../../shared/model/ProductionRequirement.model';
import {
    EntityState,
    PaginationResponse
} from "../../../types";
import { RootState } from '../../../store';

const initialState: EntityState<ProductionRequirement> = {
    status: "idle",
    entities: [],
    entity: {},
    totalItems: 0,
    currentPage: 0
};


// Actions
export const getProductRequirements = createAsyncThunk<PaginationResponse<ProductionRequirement>>("productionRequirements/fetch_entity_list",
    async () => {
        const response = await ProductionRequirementsService.getAll();
        return response.data.data;
    });


//reducer
const ProductionRequirementSlice = createSlice({
    name: 'productionRequirement',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductRequirements.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductRequirements.fulfilled, (state, action) => {
                state.status = "idle";
                state.entities = action.payload.data
                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(getProductRequirements.rejected, (state) => {
                state.status = "failed";
            })
            ;
    }
});

export default ProductionRequirementSlice.reducer;

// selectors
export const selectLoadingStatus = (state: RootState) => state.ProductionRequirement.status;
export const selectProductRequirement = (state: RootState) => state.ProductionRequirement.entity;
const selectEntities = (state: RootState) => state.ProductionRequirement.entities;
const selectTotalItems = (state: RootState) => state.ProductionRequirement.totalItems;
const selectCurrentPage = (state: RootState) => state.ProductionRequirement.currentPage;

export const selectProductRequirements = createSelector(
    selectEntities,
    selectCurrentPage,
    selectTotalItems,
    ((entities, currentPage, totalItems) => {
        return {
            data: entities,
            currentPage: currentPage,
            totalItems: totalItems
        } as PaginationResponse<ProductionRequirement>
    })
)


import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { City, ListResponse } from "../../models";

export interface CityState {
    loading: boolean
    list: City[]
}

const initialState: CityState = {
    loading: false,
    list: [],
}


export const citySlide = createSlice({
    initialState,
    name: 'city',
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.loading = false;
            state.list = action.payload.data;

        },
        fetchCityListFailed(state) {
            state.loading = false;
        },
    }
})


export const cityAction = citySlide.actions

export const citySelector = (state: RootState) => state.city.list
export const selectCityOptions = createSelector(citySelector, (cityList) => cityList.map((city) => ({
    label: city.name,
    value: city.code
})))

const cityReducer = citySlide.reducer


export default cityReducer

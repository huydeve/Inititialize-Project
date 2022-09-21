import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Student } from "../../models";

export interface DashBoardStatistics {
    maleCount: number;
    femaleCount: number;
    hightMarkCount: number;
    lowMarkCount: number;
}
export interface RankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[];
}

export interface DashboardState {
    loading: boolean;
    statistics: DashBoardStatistics;
    highestStudentList: Student[];
    lowestStudentList: Student[];
    rankingByCityList: RankingByCity[]
}

const initialState: DashboardState = {
    loading: false,
    statistics: {
        maleCount: 0,
        femaleCount: 0,
        hightMarkCount: 0,
        lowMarkCount: 0,
    },
    highestStudentList: [],
    lowestStudentList: [],
    rankingByCityList: []

}

const dashboardSlide = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
        },
        fetchDataSuccess(state) {
            state.loading = false;

        },
        fetchDataFailed(state) {
            state.loading = false;

        },
        setStatistics(state, action: PayloadAction<DashBoardStatistics>) {
            state.statistics = action.payload;
        },
        setHighestStudentList(state, action: PayloadAction<Student[]>) {
            state.highestStudentList = action.payload;
        },
        setLowestStudentList(state, action: PayloadAction<Student[]>) {
            state.lowestStudentList = action.payload;
        },

        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
            state.rankingByCityList = action.payload
        }

    }
})

//Actions
export const dashboardActions = dashboardSlide.actions;

//Selectors
export const dashboardSelector = (state: RootState) => ({
    loading: state.dashboard.loading,
    statistics: state.dashboard.statistics,
    highestStudentList: state.dashboard.highestStudentList,
    lowestStudentList: state.dashboard.lowestStudentList,
    rankingByCityList: state.dashboard.rankingByCityList,
})

//Reducer
const dashboardReducer = dashboardSlide.reducer;
export default dashboardReducer;
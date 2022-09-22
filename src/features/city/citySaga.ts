import { call, put, takeLatest } from "redux-saga/effects";
import cityApi from "../../api/cityApi";
import { City, ListResponse } from "../../models";
import { cityAction } from "./citySlice";

function* fetchCityList() {
    try {
        const response: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityAction.fetchCityListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch city list', error);
        yield put(cityAction.fetchCityListFailed())

    }
}


export default function* citySaga() {
    yield takeLatest(cityAction.fetchCityList.type, fetchCityList)
}
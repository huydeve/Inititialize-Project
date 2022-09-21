import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import studentApi from "../../api/studentApi";
import { ListParams, ListResponse, Student } from "../../models";
import { studentAction } from "./studentSlide";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)
        yield put(studentAction.fetchStudentListSuccess(response))
    } catch (error) {
        console.log('Failed to fetch student list', error);
        yield put(studentAction.fetchStudentListFailed())

    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(studentAction.setFilter(action.payload))
}

export default function* studentSaga() {
    yield takeLatest(studentAction.fetchStudentList, fetchStudentList);
    yield debounce(500, studentAction.setFilterWithDebounce.type, handleSearchDebounce)
}
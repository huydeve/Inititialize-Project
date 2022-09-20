import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { increment, incrementByAmountSaga, incrementByAmountSuccess } from './counterSlice';

export function* log(action: PayloadAction<number>) {

    console.log('log', action);
    yield delay(2000)
    console.log('counter saga');

    yield put(incrementByAmountSuccess(action.payload))
}

export default function* counterSaga() {
    yield takeLeading(incrementByAmountSaga.toString(), log)
}
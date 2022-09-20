import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from "redux-saga/effects"
import { login, loginFailed, LoginPayLoad, loginSuccess, logout } from "./authSlice"


function* handleLogin(payload: LoginPayLoad) {
    try {
        console.log('handleLogin payload', payload);
        yield put(loginSuccess({
            id: 1,
            name: "Meme"
        }))
    } catch (error) {
        if (error instanceof Error) {
            yield put(loginFailed(error.message))
        }
    }
}

function* handleLogout() {
    console.log('handleLogOut payload');
    localStorage.removeItem('access_token');

}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayLoad> = yield take(login.type)
            yield fork(handleLogin, action.payload)
        }
        yield take(logout.type)
        yield call(handleLogout)
    }

}


function* authSaga() {
    yield fork(watchLoginFlow);
}

export default authSaga
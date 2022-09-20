import { all, call, put, takeLatest } from "redux-saga/effects";
import cityApi from "../../api/cityApi";
import studentApi from "../../api/studentApi";
import { City, ListResponse, Student } from "../../models";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: 'male'
        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: 'female'

        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            mark_gte: 8
        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            mark_lte: 5

        }),
    ])

    const statisticList = responseList.map(response => response.pagination._totalRows)
    const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statisticList
    yield put(dashboardActions.setStatistics({
        maleCount: maleCount || 0,
        femaleCount: femaleCount || 0,
        hightMarkCount: hightMarkCount || 0,
        lowMarkCount: lowMarkCount || 0
    }))
}
function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _order: "desc",
        _sort: 'mark'
    })
    yield put(dashboardActions.setHighestStudentList(data))
}
function* fetchLowestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _order: "asc",
        _sort: 'mark'
    })
    yield put(dashboardActions.setHighestStudentList(data))
}
function* fetchRankingByCityList() {
    //Fetch City list
    const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll)
    //Fetch ranking per city
    const callList = cityList.map(city => call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
        city: city.code
    }))

    const responseList: Array<ListResponse<Student>> = yield all(callList);
    const rankingByCityList: Array<RankingByCity> = responseList.map((response, id) => ({
        cityId: cityList[id].code,
        rankingList: response.data
    }))

    yield put(dashboardActions.setRankingByCityList(rankingByCityList))
}

function* fetchDashBoardData() {
    try {
        yield all([
            call(fetchStatistics),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCityList),
        ])
        yield put(dashboardActions.fetchDataSuccess())
    } catch (error) {
        console.log("Failed to fetch dashboard data", error);
        yield put(dashboardActions.fetchDataFailed())
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashBoardData)
}
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import createSagaMiddleware from 'redux-saga';
import dnlnvlReducer from "../app/r2/dnlnvl/dnlnvlSlice";
import popupReducer from "../app/r2/dnlnvl/popupSlice";
import filterReducer from "../app/r2/dnlnvl/filterSlice";
import dnlnvlListReducer from "../app/r2/dnlnvl/dnlnvlListSlice";
import locationReducer from "../app/r2/dnlnvl/locationSlice";
// import adminReducer from '../pages/AdminList/adminSlice';
// import lectureReducer from '../pages/LectureList/lectureSlice';
// import authReducer from '../pages/Login/loginSlice';
// import lopReducer from '../pages/StudentList/lopSlice';
// import quyenReducer from '../pages/StudentList/quyenSlice';
// import roomReducer from "../pages/RoomList/roomSlice";
// import classReducer from "../pages/ClassList/classSlice";
// import subjectReducer from "../pages/SubjectList/subjectSlice";
// import studyReducer  from "../pages/Study/studySlice";
// import facultyReducer  from "../pages/FacultyList/facultySlice";
// import attendanceReducer  from "../pages/DiemDanh/attendanceSlice";
// import rootSaga from './saga/rootSaga';

// const sagaMiddleware = createSagaMiddleware();
const rootReducer = {
    dnlnvl: dnlnvlReducer,
    popup: popupReducer,
    filter: filterReducer,
    location: locationReducer,
    dnlnvlList: dnlnvlListReducer,
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: true,
        }),
    // .concat(sagaMiddleware)
});

// sagaMiddleware.run(rootSaga);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

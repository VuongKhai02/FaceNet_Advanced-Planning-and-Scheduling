import { configureStore } from "@reduxjs/toolkit";

import reducers from "./pages/reducers";

const store = configureStore({
    reducer: {
        // ...
        ...reducers,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: true,
        serializableCheck: true,
    }),
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
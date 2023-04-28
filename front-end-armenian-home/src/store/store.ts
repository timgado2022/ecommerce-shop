import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { userSlice } from "./user/user.slice";




// Сохраняет локальные данные в корзине, даже при перезагрузке страницы
const persistConfig ={ 
    key: "armenian-home-shop",
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    carousel: carouselSlice.reducer,
    user: userSlice.reducer
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
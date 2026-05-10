import {configureStore} from "@reduxjs/toolkit"
import { sliceHero } from "./slice/heroData"
import { sliceWakafat } from "./slice/wakafatData"
import { sliceNames } from "./slice/namesData"
import { sliceSunna } from "./slice/sunnaData"
import { sliceLogger } from "./slice/logger"
import { likesTogleSlice } from "./slice/togleLike"
import { sliceSendComments } from "./slice/sendComments"
import { sliceGetComments } from "./slice/getComments"
import { sliceDeleteComments } from "./slice/deleteComments"
export const store=configureStore({
    reducer:{
        heroData:sliceHero.reducer,
        wakafatData:sliceWakafat.reducer,
        namesData:sliceNames.reducer,
        sunnaData:sliceSunna.reducer,
        loggedData:sliceLogger.reducer,
        ToglelikeData:likesTogleSlice.reducer,
        sendComments:sliceSendComments.reducer,
        getComments:sliceGetComments.reducer,
        deleteComments:sliceDeleteComments.reducer,
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
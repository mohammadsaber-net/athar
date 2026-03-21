import {configureStore} from "@reduxjs/toolkit"
import { sliceHero } from "./slice/heroData"
import { sliceWakafat } from "./slice/wakafatData"
import { sliceNames } from "./slice/namesData"
import { sliceSunna } from "./slice/sunnaData"
export const store=configureStore({
    reducer:{
        heroData:sliceHero.reducer,
        wakafatData:sliceWakafat.reducer,
        namesData:sliceNames.reducer,
        sunnaData:sliceSunna.reducer,
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
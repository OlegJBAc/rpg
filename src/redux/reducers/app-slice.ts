import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    theme: 'Dark' as 'Light' | 'Dark',
}


const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        appThemeInitializing: (state, action: PayloadAction<'Light' | 'Dark' | null>) => {
            if(action.payload){
                state.theme = action.payload
            }
        },
        changeAppTheme: (state, action: PayloadAction<'Light' | 'Dark'>) => {
            localStorage.setItem('theme', action.payload)
            state.theme = action.payload
        },
    },
})


export const { appThemeInitializing, changeAppTheme } = appSlice.actions

export default appSlice.reducer
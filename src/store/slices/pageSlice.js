import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    showModal:false,
    modalType:""
}

const pageSlice = createSlice({
    name: "pageActions",
    initialState,
    reducers: {
        toggleModalAlert:(state )=>{
            state.showModal = state.showModal?false:true
        },
        setModalType:(state, action )=>{
            state.modalType = action.payload
        }
    }
})
export const { toggleModalAlert, setModalType} = pageSlice.actions

export default pageSlice.reducer
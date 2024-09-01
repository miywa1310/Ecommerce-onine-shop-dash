import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    categories: [],
    isCategoriesLoad: false,
    isCategoriesError: null,
    selectedId:null
}

export const fetchCategoryData = createAsyncThunk(
    "categories/fetchCategoryData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }

)
export const createCategory=createAsyncThunk(
    "categories/createCategory",
    async({urlCategory, categoryData}, { dispatch })=>{
      const res = await axios.post(urlCategory, categoryData)
      dispatch(fetchCategoryData(urlCategory))
      return res.data
    }
)
export const deleteCategory=createAsyncThunk(
    "categories/deleteCategory",
    async({urlCategory, selectedId}, { dispatch })=>{
      const res = await axios.delete(`${urlCategory}/${selectedId}`)
      dispatch(fetchCategoryData(urlCategory))
      return res.data
    }
)

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ urlCategory, id, updateData }, { dispatch }) => {
        const res = await axios.put(`${urlCategory}/${id}`, updateData)
        dispatch(fetchCategoryData(urlCategory))
        return res.data
    }
)

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setSelectedId:(state,action )=>{
            state.selectedId=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategoryData.pending, (state) => {
            state.isCategoriesLoad = true
        }).addCase(fetchCategoryData.fulfilled, (state, action) => {
            state.isCategoriesLoad = false,
            state.categories = action.payload
        }).addCase(fetchCategoryData.rejected, (state, action) => {
            state.isCategoriesLoad = false,
            state.isCategoriesError = action.error.message
        })
    }
})
export const { setSelectedId } = categoriesSlice.actions

export default categoriesSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toggleModalAlert } from "./pageSlice"

const initialState = {
    products: [],
    selectedProId:null,
    isProductsLoad: false,
    isProductsError: null
}

export const fetchProductData = createAsyncThunk(
    "products/fetchProductData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }

)

export const createProduct=createAsyncThunk(
    "products/createProduct",
    async({urlProduct, productData}, { dispatch })=>{
      const res = await axios.post(urlProduct, productData)
      dispatch(fetchProductData(urlProduct))
      return res.data
    }
)
export const deleteProduct=createAsyncThunk(
    "products/deleteProduct",
    async({urlProduct, selectedProId}, { dispatch })=>{
      const res = await axios.delete(`${urlProduct}/${selectedProId}`)
      dispatch(fetchProductData(urlProduct))
      return res.data
    }
)

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ urlProduct, id, updateData }, { dispatch }) => {
        const res = await axios.put(`${urlProduct}/${id}`, updateData)
        dispatch(toggleModalAlert())
        dispatch(fetchProductData(urlProduct))
        return res.data
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSelectedProId:(state,action )=>{
            state.selectedProId=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.pending, (state) => {
            state.isProductsLoad = true
        }).addCase(fetchProductData.fulfilled, (state, action) => {
            state.isProductsLoad = false,
                state.products = action.payload
        }).addCase(fetchProductData.rejected, (state, action) => {
            state.isProductsLoad = false,
                state.isProductsError = action.error.message
        })
    }
})
export const { setSelectedProId } = productsSlice.actions

export default productsSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import budgetService from "./budgetService";
const initialState = {
    budget:5000,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
}

export const createBudget = createAsyncThunk('budget/create', async (budgetData, thunkAPI) => {
    try {
        console.log('inside bill Slice')
        return await budgetService.createBudget(budgetData);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getBudget = createAsyncThunk('budget/getAll', async(_,thunkAPI) => {
    try {
        
        return await budgetService.getBudget();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const budgetSlice = createSlice({
    name:'budget',
    initialState,
    reducers:{
        reset:(state) => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(createBudget.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBudget.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                
                state.budget = action.payload
                
            })
            .addCase(createBudget.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBudget.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBudget.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.budget = action.payload
            })
            .addCase(getBudget.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
}
})

export const {reset} = budgetSlice.actions
export default budgetSlice.reducer
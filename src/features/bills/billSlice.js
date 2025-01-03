import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import billService from "./billService";


const initialState = {
    bills:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
}

export const createBill = createAsyncThunk('bills/create', async (billData, thunkAPI) => {
    try {
        console.log('inside bill Slice')
        return await billService.createBill(billData);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getBills = createAsyncThunk('bills/getAll', async(_,thunkAPI) => {
    try {
        
        return await billService.getBills();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteBill = createAsyncThunk('bills/delete', async (id, thunkAPI) => {
    try {
        return await billService.deleteBill(id)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const updateBill = createAsyncThunk('bills/update', async (updatedBill, thunkAPI) => {
    try {
        return await billService.updateBill(updatedBill)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const billSlice = createSlice({
    name:'bill',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(createBill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createBill.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log('before adding the bill', state);
                state.bills.push(action.payload)
                console.log('inside extraReducer', state.bills);
            })
            .addCase(createBill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getBills.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBills.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bills = action.payload
            })
            .addCase(getBills.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteBill.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteBill.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.bills = state.bills.filter((bill) => bill._id !== action.payload)
            })
            .addCase(deleteBill.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateBill.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBill.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                // Replace the updated bill in the array
                const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
                if (index !== -1) {
                    state.bills[index] = action.payload;
                }
            })
            .addCase(updateBill.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const {reset} = billSlice.actions
export default billSlice.reducer
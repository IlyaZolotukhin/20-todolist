import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {authApi, LoginParamsType} from "features/auth/api/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, thunkTryCatch} from "common/utils";
import {ResultCode} from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean },
    LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const res = await authApi.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true};
    } else {
        return rejectWithValue(res.data);
    }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
("auth/logout", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
        const res = await authApi.logout();
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodolists());
            return {isLoggedIn: false};
        } else {
            return rejectWithValue(res.data);
        }
});

const initializeApp = createAppAsyncThunk<{
    isLoggedIn: boolean
}, undefined>("auth/initializeApp", async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const res = await authApi.me();
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true};
    } else {
        return rejectWithValue(res.data);
    }
});

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                })
    },
});

export const authSlice = slice.reducer;
export const authThunks = {login, logout, initializeApp};

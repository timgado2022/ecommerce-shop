import { AuthService } from "@/services/auth/auth.service"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAuthResponse, IEmailPassword } from "./user.interface"
import { removeFromStorage } from "@/services/auth/auth.helper"
import { errorCatch } from "@/api/api.helper"



// регистрация
export const register = createAsyncThunk<IAuthResponse, IEmailPassword> (
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.main('register', data)
            return response 
        }
        catch (error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

// логин 
export const login = createAsyncThunk<IAuthResponse, IEmailPassword> (
    'auth/login', async(data, thunkApi) => {
        try {
            const response = await AuthService.main('login', data)
            return response
        }
        catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

// выйти из профиля, удалить все cookies и asyncThunk
export const logout = createAsyncThunk('auth/login', async () => {
    removeFromStorage()
})

// проверка на авторизацию
export const checkAuth = createAsyncThunk<IAuthResponse>('auth/check-auth', async (_, thunkApi) => {
    try {
        const response = await AuthService.getNewTokens()
        return response.data
    }
    catch (error) {
        if(errorCatch(error) === 'jwt expired'){
            thunkApi.dispatch(logout())
        }
        
        return thunkApi.rejectWithValue(error)
    }
})
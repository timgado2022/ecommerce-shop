import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { getAccessToken, removeFromStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";


export const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
})

instance.interceptors.request.use(async config => {
    const accessToken = getAccessToken()

    if(config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

instance.interceptors.response.use(config => config, async error => {
    const originalReguest = error.config

    if(
        (error.response.status === 401 || errorCatch(error) === 'jwt expired' || errorCatch(error) === 'jwt must be provided') &&
        error.config && !error.config._isRetry
    ) {
        originalReguest._isRetry = true
        try {
            // get new tokens
            await AuthService.getNewTokens
            return instance.request(originalReguest)
        } catch(error) {
            if(errorCatch(error) === 'jwt expired') 
            // detele tokens
            removeFromStorage()
        }
    }
    throw error
})


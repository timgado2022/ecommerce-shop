import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { IUser } from "@/types/user.interface"

const USERS = 'users'

export const UserService =  {
    async getProfile() {
        return instance<IUser[]>({
            url: `${USERS}/profile`,   
            method: 'GET',
        })
    },
    async updateProfile(data: TypeDataUser) {
        return instance<IUser>({
            url: `${USERS}/profile}`,   
            method: 'PUT',
            data
        })
    },
    async toggleFavorite(productId: string | number) {
        return instance<IUser>({
            url: `${USERS}/profile/favorites/${productId}`,      
            method: 'PATCH',
        })
    },
}



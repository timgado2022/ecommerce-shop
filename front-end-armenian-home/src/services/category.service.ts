import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { ICategory } from "@/types/category.interface"

const CATEGORY = 'category'

export const CategoryService =  {
    async getAll() {
        return instance<ICategory[]>({
            url: CATEGORY,   
            method: 'GET',
        })
    
    },
    async getById() {
        return instance<ICategory[]>({
            url: `${CATEGORY}/:id`,   
            method: 'GET',
        })
    
    },
    async get() {
        return instance<ICategory[]>({
            url: CATEGORY,   
            method: 'GET',
        })
    
    },
}



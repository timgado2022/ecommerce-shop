import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { PRODUCTS, TypeDataFilters, TypeDataProducts } from "./product.types"
import { IProduct } from "@/types/product.interface"



export const ProductService =  {
    async getAll(queryData = {} as TypeDataFilters) {
        return instance<IProduct[]>({
            url: PRODUCTS,   
            method: 'GET',
            params: queryData
        })
    },
    async getSimilar(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCTS}/similar/${id}`,   
            method: 'GET'
        })
    },
    async getBySlug(slug: string) {
        return instance<IProduct>({
            url: `${PRODUCTS}/by-slug/${slug}`,   
            method: 'GET'
        })
    },
    async getByCategory(categorySlug: string) {
        return instance<IProduct>({
            url: `${PRODUCTS}/by-category/${categorySlug}`,   
            method: 'GET'
        })
    },
    async getById(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCTS}/${id}`,   
            method: 'GET'
        })
    },
    async create() {
        return instance<IProduct>({
            url: PRODUCTS,
            method: 'POST'
        })
    },
    async update(id: string | number, data: TypeDataProducts ) {
        return instance<IProduct>({
            url: `${PRODUCTS}/${id}`,   
            method: 'PUT',
            data 
        })
    },
    async delete(id: string | number) {
        return instance<IProduct>({
            url: `${PRODUCTS}/${id}`,      
            method: 'DELETE',
        })
    },
}



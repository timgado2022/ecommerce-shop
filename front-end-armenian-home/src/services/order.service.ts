import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { IOrder } from "@/types/order.interface"


const ORDERS = 'orders'

export const OrderService =  {
    async getAll() {
        return instance<IOrder[]>({
            url: ORDERS,   
            method: 'GET',
        })
    }
    
    
}



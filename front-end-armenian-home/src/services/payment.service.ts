import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { IPaymentResponse } from "@/types/payment.interface"


const PAYMENT = 'payment'

export const PaymentService =  {
    async createPayment(amount: number) {
        return instance.post<IPaymentResponse>(PAYMENT, {
            amount
        })

        
    }
    
}



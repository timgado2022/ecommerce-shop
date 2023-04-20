import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"
import { IReview } from "@/types/review.interface"

const REVIEWS = 'reviews'

export const ReviewService =  {
    async getAll() {
        return instance<IReview[]>({
            url: REVIEWS,   
            method: 'GET',
        })
    },
    async update(productId: string | number, data: TypeDataReview  ) {
        return instance<IReview>({
            url: `${REVIEWS}/leave/${productId}`,   
            method: 'POST',
            data
        })
    },
    
}



import Cookies from "js-cookie"
import { getContentType } from "@/api/api.helper"
import axios from "axios"
import { instance } from "@/api/api.interceptor"


const STATISTICS = 'statistics'

export const StatisticsService =  {
    async getMain() {
        return instance<TypeStatisticsResponse[]>({
            url: `${STATISTICS}/main`,   
            method: 'GET',
        })
    }
    
}



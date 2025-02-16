import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { APIURL } from "../constant/ApiUrl";

export const destinationApi = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:APIURL
    }),
    endpoints:(builder)=>({
        all:builder.query({
            query: ()=>'/all'
        })
    })
})

export const {useAllQuery} = destinationApi;
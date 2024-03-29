import { useQuery } from "react-query"
import AXIOS from "./axios"






export const useSiteSetting = () => {
    return useQuery({
        queryKey: ["settings-data"],
        queryFn: async () => {
            const { data } = await AXIOS.get("/api/settings-data/")
            return data?.settings[0]
        }
    })

}
export const useAboutUsReview = () => {
    return useQuery({
        queryKey: ["about_us"],
        queryFn: async () => {
            const { data } = await AXIOS.get("/api/settings-data/")
            return data?.about_us_reviews
        }
    })

}


export const useGetSingleCategory = () => {
    return useQuery({
        queryKey: ["/api/category-list/"],
        queryFn: async () => {
            const { data } = await AXIOS.get("/api/category-list/")
            const randomIndex = Math.floor(Math.random() * arrayOfObjects.length);
            const randomObject = data[randomIndex];

            return randomObject
        }
    })
}
export const useGetCategoryProduct = (filter) => {
    return useQuery({
        queryKey: [filter],
        queryFn: async () => {
            const { data } = await AXIOS.get(`/api/products/product-filter/?category=${filter}`)

            return data
        }
    })
}

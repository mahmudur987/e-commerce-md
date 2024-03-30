import { useQuery } from "react-query"
import AXIOS from "./axios"

export const useGetAllProduct = (filter) => {
    return useQuery({
        queryKey: [filter],
        queryFn: async () => {
            const { data } = await AXIOS.get(`/api/products/product-filter/?${filter ? filter : ""}`)
            return data
        }
    })
}
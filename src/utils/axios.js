import axios from "axios";

export const imageUrl = "https://api.dottech.com.bd"

const AXIOS = axios.create({
    baseURL: "https://api.dottech.com.bd"
})


export default AXIOS
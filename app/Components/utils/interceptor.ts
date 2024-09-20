import axios from "axios";
import { API_URL } from "./url.config";

export const axiosClassic = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

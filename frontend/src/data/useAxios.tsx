import axios from "axios";
import { useMemo } from "react";
import dotenv from "dotenv"

dotenv.config();

export const useAxios = () => {
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: "https://menorca-backend.onrender.com/"
        });

        // request Interceptors
        instance.interceptors.request.use((config) => {
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // response Interceptors
        instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            return Promise.reject(error);
        });

        return instance;
        }, []);
    
    return axiosInstance;
}
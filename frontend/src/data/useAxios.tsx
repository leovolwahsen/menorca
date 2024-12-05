import axios from "axios";
import { useMemo } from "react";
import dotenv from "dotenv"

dotenv.config();

export const useAxios = () => {
    const axiosInstance = useMemo(() => {
        const instance = axios.create({
            baseURL: `${process.env.VITE_BACKEND_URL}`
        });

        // request Interceptors
        instance.interceptors.request.use((config: any) => {
            return config;
        }, (error: any) => {
            return Promise.reject(error);
        });

        // response Interceptors
        instance.interceptors.response.use((response: any) => {
            return response;
        }, (error: any) => {
            return Promise.reject(error);
        });

        return instance;
        }, []);
    
    return axiosInstance;
}
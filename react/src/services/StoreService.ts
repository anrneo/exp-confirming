import axios from 'axios'
import { AxiosError, AxiosResponse } from 'axios'
import { StoreResponse } from '../types'




const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api'
  })

export const getStores = async (): Promise<AxiosResponse<StoreResponse> | AxiosError> => {
  return await axiosInstance.get('/store')
}

export const createStore = async (data:any): Promise<AxiosResponse<StoreResponse> | AxiosError> => {
  return await axiosInstance.post('/store', data)
}

export const deleteStore = async (id:any): Promise<AxiosResponse<StoreResponse> | AxiosError> => {
  return await axiosInstance.delete(`/store/${id}`)
}

export const editStore = async (id:number, data:any): Promise<AxiosResponse<StoreResponse> | AxiosError> => {
  return await axiosInstance.put(`/store/${id}`, data)
}

export const getStore = async (id:number): Promise<AxiosResponse<StoreResponse> | AxiosError> => {
  return await axiosInstance.get(`/store/${id}`)
}
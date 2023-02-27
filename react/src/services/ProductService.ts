import axios from 'axios'
import { AxiosError, AxiosResponse } from 'axios'
import { Product } from '../types'




const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api'
  })

export const getProducts = async (): Promise<AxiosResponse<Product> | AxiosError> => {
  return await axiosInstance.get('/product')
}

export const createProduct = async (data:any): Promise<AxiosResponse<Product> | AxiosError> => {
  return await axiosInstance.post('/product', data)
}

export const deleteProduct = async (id:any): Promise<AxiosResponse<Product> | AxiosError> => {
  return await axiosInstance.delete(`/product/${id}`)
}

export const editProduct = async (id:number, data:any): Promise<AxiosResponse<Product> | AxiosError> => {
  return await axiosInstance.put(`/product/${id}`, data)
}

export const getProduct = async (id:number): Promise<AxiosResponse<Product> | AxiosError> => {
  return await axiosInstance.get(`/product/${id}`)
}
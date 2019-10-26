import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import Host from '../environment/Host'

export const getUserToken = async() => {
    const userToken = await AsyncStorage.getItem('userToken')
    return userToken   
}

export const getUserId = async() => {
    const userIdJSON = await AsyncStorage.getItem('userId')
    const userId = JSON.parse(userIdJSON)
    console.log(userIdJSON)
    return userId 
}

export const addNewRoom = async(data) => {
    const userToken = await getUserToken()
    const response = await axios.post(`${Host.localhost}/room`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
    return response.data
}

export const editRoom = async (data, roomId) => {
    const userToken = await getUserToken()
    const response = await axios.put(`${Host.localhost}/room/${roomId}`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
}

export const addCustomer = async (data) => {
    const userToken = await getUserToken()
    const response = await axios.post(`${Host.localhost}/customer`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
    return response.data
}

export const editCustomer = async (data, customerId) => {
    const userToken = await getUserToken()
    const response = await axios.put(`${Host.localhost}/customer/${customerId}`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
    return response.data
}

export const addOrder = async (data) => {
    const userToken = await getUserToken()
    const response = await axios.post(`${Host.localhost}/checkin`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
    return response.data
}

export const checkOutRoom = async (data, orderId) => {
    const userToken = await getUserToken()
    console.log(orderId)
    const response = await axios.put(`${Host.localhost}/order/${orderId}`, data , {
        headers : {"Authorization" : `Bearer ${userToken}`}
    })
    return response.data
}
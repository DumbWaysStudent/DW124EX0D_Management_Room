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
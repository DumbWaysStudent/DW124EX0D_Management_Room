import Host from '../../environment/Host'
import Axios from 'axios'

export const getCustomer = (userToken) => {
    return {
        type: "GET_CUSTOMER",
        payload: Axios.get(`${Host.localhost}/customers`,{
            headers : {Authorization : `Bearer ${userToken}`}
        })
      };
}
import Host from '../../environment/Host'
import Axios from 'axios'

export const getRoom = () => {
    return {
        type: "GET_ROOM",
        payload: Axios.get(`${Host.localhost}/rooms`)
      };
}
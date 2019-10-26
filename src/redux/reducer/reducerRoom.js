const initialState = {
    data : [],
    isLoading : true,
    error : false
}

const reducerRoom = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_ROOM":
            return {
                ...state,
                data : actions.payload,
                isLoading : true
            }
        case "GET_ROOM_FULFILLED":
            return {
                ...state,
                data: actions.payload.data,
                isLoading: false
            };
        case "GET_ROOM_REJECTED" : 
            return {
                ...state,
                isLoading : false,
                error : true
            }
        default : 
            return state
    }
}

export default reducerRoom
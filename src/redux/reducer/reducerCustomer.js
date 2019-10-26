const initialState = {
    data : [],
    isLoading : true,
    error : false
}

const reducerCustomer = (state = initialState, actions) => {
    switch(actions.type) {
        case "GET_CUSTOMER":
            return {
                ...state,
                data : actions.payload,
                isLoading : true
            }
        case "GET_CUSTOMER_FULFILLED":
            return {
                ...state,
                data: actions.payload.data,
                isLoading: false
            };
        case "GET_CUSTOMER_REJECTED" : 
            return {
                ...state,
                isLoading : false,
                error : true
            }
        default : 
            return state
    }
}

export default reducerCustomer
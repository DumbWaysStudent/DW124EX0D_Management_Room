import { createStore, combineReducers, applyMiddleware} from 'redux'

import promise from 'redux-promise-middleware'

import reducerRoom from '../reducer/reducerRoom'
import reducerCustomer from '../reducer/reducerCustomer'

const reducer = combineReducers({
    Room : reducerRoom,
    Customer : reducerCustomer

})

const store = createStore(reducer , applyMiddleware(promise))

export default store




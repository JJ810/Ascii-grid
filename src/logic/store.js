import {createStore, combineReducers, applyMiddleware} from 'redux';
import products from './reducers/products';
import thunk from 'redux-thunk';
let middlewares = [thunk]

const reducers = combineReducers({
    products
});

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')
    // middlewares.push(logger) //uncomment this line to show logger in the console
}
const store = createStore(
    reducers,
    applyMiddleware(...middlewares)
)
export default store;

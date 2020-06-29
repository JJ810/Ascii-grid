import { types } from '../actions/constants'

const initialState = {
    loading: false,
    sort: '',
    data: [],
    preload: [],
    extra: true
}

const products =  (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.PRODUCTS_SUCCESS:
            return {
                ...state,
                sort: action.sort,
                loading: false,
                extra: action.data.length > 0,
                data: action.sort !== state.sort ? action.data : [...state.data, ...action.data]
            }
        case types.PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case types.PRELOAD_PRODUCTS:
            return {
                ...state,
                preload: action.data,
                extra: action.data.length > 0
            }
        case types.PRODUCTS_LOADMORE:
            return {
                ...state,
                loading: false,
                preload: [],
                data: [...state.data, ...state.preload]
            }
        default:
            return state
    }
}
export default products
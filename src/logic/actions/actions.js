import { serviceCall } from '../../../CommonFunctions'
import { types } from './constants'
import  {configuration} from '../../../configuration'

const get = () => ({
    type: types.PRODUCTS_REQUEST
})

const success = (data, sort) => ({
    type: types.PRODUCTS_SUCCESS,
    data,
    sort
})

const failure = error => ({
    type: types.PRODUCTS_FAILURE,
    error
})

const preload = data => ({
    type: types.PRELOAD_PRODUCTS,
    data
})

const loadmore = () => ({
    type: types.PRODUCTS_LOADMORE
})

const getProducts = (sort = '', page = 1, limit = configuration.PRODUCT_LIMIT) => dispatch => {
    dispatch(get())

    serviceCall(`products?_page=${page}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
        .then(res => {
            dispatch(success(res, sort))

            // preload data
            serviceCall(`products?_page=${page + 1}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
                .then(res => dispatch(preload(res)))
        })
        .catch(err => dispatch(failure(err)))
}

const loadMoreProducts = (sort, page, limit = configuration.PRODUCT_LIMIT) => dispatch => {
    dispatch(get())

    dispatch(loadmore())

    // Pre-emptively load data
    serviceCall(`products?_page=${page + 1}&_limit=${limit}${sort ? '&_sort=' + sort : ''}`, {}, 'get')
        .then(res => dispatch(preload(res)))
}

export const actions = {
    getProducts,
    loadMoreProducts
}

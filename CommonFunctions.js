import { configuration } from './configuration'

export const serviceCall = (path, headers, method, params) => {
    let options = {
        method,
        headers: { ...headers, 'Content-Type': 'application/json' },
    }

    if (method !== 'get') {
        options.body = JSON.stringify(params)
    }
    return fetch(`${configuration.SERVICE_BASE_URL}${path}`, options).then(handleResponse, handleError)
}

const handleResponse = response => {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type")
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json))
            } else {
                response.text().then(text => resolve(text))
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text))
        }
    });
}

const keys = Array.from({ length: configuration.ADS_LIMIT_ID }, (_, i) => i + 1)

export const helpers = {
    diffDays(date1, date2) {
        let difference_in_time = date2.getTime() - date1.getTime();
        let difference_in_days = difference_in_time / (1000 * 3600 * 24);
        return parseInt(difference_in_days);
    },
    randomAdsKey(prevKey) {
        const filter = keys.filter(k => k !== prevKey)
        return filter[Math.floor(Math.random() * filter.length)]
    }
}

export const centToDollar = (cents) => {
    let dollars = cents / 100;
    return dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export const formatDate = (d) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let current_datetime = d;
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    return formatted_date;
}

const handleError = error => Promise.reject(error && error.message)

import { createSelector } from 'reselect'
import { helpers, centToDollar,formatDate } from '../../../CommonFunctions'
import { configuration } from '../../../configuration'
const returnProducts = state => state.products


export const getFormattedProducts = createSelector(
    [returnProducts],
    products => {
        const now = new Date()
        return products.data.map(p => {
            let newProd = { ...p }
            const date = new Date(newProd.date)
            const diff = helpers.diffDays(date, now)
            switch (diff) {
                case 0:
                    newProd.date = 'Today'
                    break
                case 1:
                    newProd.date = 'Yesterday'
                    break
                default:
                    newProd.date = `${diff} Days ago`
                    break;
            }
            if (diff > configuration.DATE_LIMIT) newProd.date = formatDate(date)
            

            newProd.price = `${centToDollar(newProd.price)}`

            return newProd
        })
    }
)
import type { CurrencyValueResponse } from '@/application/interfaces'
import type { CurrencyService } from '../../interfaces/services/currencyservice.interface'

export class CurrencyServiceImpl implements CurrencyService {
  API_LINK = 'https://api.freecurrencyapi.com/v1'
  getCurrencyValuePerUSD(baseCurrency: string, currency: string): Promise<CurrencyValueResponse> {
    return new Promise<CurrencyValueResponse>((resolve, reject) => {
      fetch(
        `${this.API_LINK}/latest?apikey=${
          import.meta.env.VITE_APP_FREE_CURRENCY_APP
        }&base_currency=${baseCurrency}&currencies=${currency}`
      )
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err))
    })
  }
}

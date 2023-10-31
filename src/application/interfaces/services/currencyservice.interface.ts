import type { CurrencyValueResponse } from '..'

export interface CurrencyService {
  getCurrencyValuePerUSD(baseCurrency: string, currency: string): Promise<CurrencyValueResponse>
}

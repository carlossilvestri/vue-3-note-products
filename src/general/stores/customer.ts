import { defineStore } from 'pinia'
import { customerService, type Customer, type Credentials } from '@/authentication/interfaces'
import type { ApiMessage } from '@/application/interfaces'

export const useCustomerStore = defineStore('customer', {
  state: () =>
    ({
      id: 0,
      name: '',
      password: '',
      email: '',
      address: '',
      showPricesIn: 'USD',
      tasa: 0
    }) as Customer,

  getters: {
    getShowPricesIn: (state) => state.showPricesIn
  },

  actions: {
    save(customer: Customer) {
      this.$state = { ...customer }
    },
    async changeShowPrice(showPrice: string) {
      this.showPricesIn = showPrice
      await customerService.changeShowPricesIn(showPrice)
    },
    async changeTasa(tasa: number) {
      this.tasa = tasa
      await customerService.changeTasa(tasa)
    },
    async login(credentials: Credentials): Promise<ApiMessage> {
      const resp: ApiMessage = await customerService.login(credentials)
      if (resp.status == 200) {
        const customer: Customer = await customerService.getAuthenticated()
        this.save(customer)
      }
      return resp
    }
  }
})

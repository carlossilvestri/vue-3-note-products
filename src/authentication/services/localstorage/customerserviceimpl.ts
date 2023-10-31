import { API_MESSAGE, CUSTOMER } from '@/application/constants'
import type { ApiMessage } from '@/application/interfaces'
import type { Credentials, Customer } from '@/authentication/interfaces'
import type { CustomerService } from '@/authentication/interfaces/services/customerservice.interface'
import { customers } from '@/authentication/mock/customer.mock'

export class CustomerServiceImpl implements CustomerService {
  changeTasa(tasa: number): Promise<ApiMessage> {
    const apiMessage: ApiMessage = API_MESSAGE.SUCCESS
    return new Promise<ApiMessage>((resolve, reject) => {
      this.getAuthenticated()
        .then((data) => {
          const customer = data
          customer.tasa = tasa
          const customerString = JSON.stringify(customer)
          localStorage.setItem(CUSTOMER, customerString)
          resolve(apiMessage)
        })
        .catch((error) => reject(error))
    })
  }
  save(customer: Customer): Promise<ApiMessage> {
    const apiMessage: ApiMessage = API_MESSAGE.SUCCESS
    return new Promise<ApiMessage>((resolve) => {
      const customerString = JSON.stringify(customer)
      localStorage.setItem(CUSTOMER, customerString)
      resolve(apiMessage)
    })
  }

  changeShowPricesIn(showPricesIn: string): Promise<ApiMessage> {
    const apiMessage: ApiMessage = API_MESSAGE.SUCCESS
    return new Promise<ApiMessage>((resolve, reject) => {
      this.getAuthenticated()
        .then((data) => {
          const customer = data
          customer.showPricesIn = showPricesIn
          const customerString = JSON.stringify(customer)
          localStorage.setItem(CUSTOMER, customerString)
          resolve(apiMessage)
        })
        .catch((error) => reject(error))
    })
  }
  getAuthenticated(): Promise<Customer> {
    return new Promise<Customer>((resolve, reject) => {
      const customerString = localStorage.getItem(CUSTOMER)
      if (customerString) {
        const customer: Customer = JSON.parse(customerString)
        resolve(customer)
      }
      reject('ERROR: User not authenticated')
    })
  }
  login(credentials: Credentials): Promise<ApiMessage> {
    let apiMessage: ApiMessage = API_MESSAGE.SUCCESS
    return new Promise<ApiMessage>((resolve, reject) => {
      try {
        const customer: Customer | undefined = customers.find(
          (val) => val.email === credentials.email && val.password === credentials.password
        )
        if (customer) {
          const customerString = JSON.stringify(customer)
          localStorage.setItem(CUSTOMER, customerString)
          resolve(apiMessage)
        } else {
          apiMessage = API_MESSAGE.ERROR
          apiMessage.message = 'User or password incorrect'
        }
      } catch (error) {
        apiMessage = API_MESSAGE.ERROR
        const err = JSON.stringify(error)
        apiMessage.message = err
      }
      reject(apiMessage)
    })
  }
  logout(): Promise<ApiMessage> {
    let apiMessage: ApiMessage = API_MESSAGE.SUCCESS
    return new Promise<ApiMessage>((resolve, reject) => {
      try {
        localStorage.clear()
        resolve(apiMessage)
      } catch (error) {
        apiMessage = API_MESSAGE.ERROR
        const err = JSON.stringify(error)
        apiMessage.message = err
        reject(apiMessage)
      }
    })
  }
}

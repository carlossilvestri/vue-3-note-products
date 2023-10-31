import type { ApiMessage, Customer } from '@/application/interfaces'
import type { Credentials } from '..'

export interface CustomerService {
  logout(): Promise<ApiMessage>
  login(credentials: Credentials): Promise<ApiMessage>
  getAuthenticated(): Promise<Customer>
  changeShowPricesIn(showPricesIn: string): Promise<ApiMessage>
  changeTasa(tasa: number): Promise<ApiMessage>
  save(customer: Customer): Promise<ApiMessage>
}

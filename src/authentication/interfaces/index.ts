import { CustomerServiceImpl } from '../services/localstorage/customerserviceimpl'
import type { CustomerService } from './services/customerservice.interface'

export type { Customer } from './customer.interface'
export type { Credentials } from './credentials.interface'

export const customerService: CustomerService = new CustomerServiceImpl()

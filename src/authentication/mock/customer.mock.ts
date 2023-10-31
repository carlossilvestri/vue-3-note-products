import type { Customer } from '../interfaces'

export const customers: Customer[] = [
  {
    id: 1,
    name: 'admin',
    password: '123',
    email: 'admin@example.com',
    address: '7 Street, Chicago.',
    showPricesIn: 'USD',
    tasa: 1
  },
  {
    id: 2,
    name: 'Carlos',
    password: '123',
    email: 'carlos@example.com',
    address: '8 Street, Chicago.',
    showPricesIn: 'USD',
    tasa: 1
  }
]

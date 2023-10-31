import type { NoteSale, ApiMessage } from '..'

export interface NoteSaleService {
  save(noteSale: NoteSale): Promise<ApiMessage>
  create(noteSale: NoteSale): Promise<ApiMessage>
  deleteById(id: string): Promise<ApiMessage>
  getAll(): Promise<NoteSale[]>
  getbyId(id: string): Promise<NoteSale>
  saveAll(noteSales: NoteSale[]): Promise<ApiMessage>
}

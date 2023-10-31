import { API_MESSAGE, NOTE_SALES } from '../../constants'
import type { ApiMessage, NoteSale, NoteSaleService } from '../../interfaces'

export class NoteSaleServiceImplLocalStorage implements NoteSaleService {
  saveAll(noteSales: NoteSale[]): Promise<ApiMessage> {
    const apiMessage: ApiMessage = API_MESSAGE.SUCCESS

    return new Promise<ApiMessage>((resolve) => {
      localStorage.setItem(NOTE_SALES, JSON.stringify(noteSales))
      resolve(apiMessage)
    })
  }
  getbyId(id: string): Promise<NoteSale> {
    return new Promise<NoteSale>((resolve, reject) => {
      let noteSales: NoteSale[] = []

      this.getAll()
        .then((resp) => {
          noteSales = resp
          const noteSale: NoteSale | undefined = noteSales.find((val) => val.id === id)
          if (noteSale) resolve(noteSale)
        })
        .catch((err) => {
          const errorMsg = JSON.stringify(err)
          reject(errorMsg)
        })
    })
  }
  getAll(): Promise<NoteSale[]> {
    return new Promise<NoteSale[]>((resolve) => {
      const noteSalesString = localStorage.getItem(NOTE_SALES) || '[]'
      const noteSales: NoteSale[] = JSON.parse(noteSalesString)
      resolve(noteSales)
    })
  }
  save(noteSale: NoteSale): Promise<ApiMessage> {
    let apiMessage: ApiMessage = API_MESSAGE.SUCCESS

    return new Promise<ApiMessage>((resolve, reject) => {
      let noteSalesString = localStorage.getItem(NOTE_SALES)

      if (noteSalesString) {
        const noteSales: NoteSale[] = JSON.parse(noteSalesString)
        const noteSaleFoundIndex: number = noteSales.findIndex((val) => (val.id = noteSale.id))
        noteSales[noteSaleFoundIndex] = noteSale
        noteSalesString = JSON.stringify(noteSales)
        localStorage.setItem(NOTE_SALES, noteSalesString)
        resolve(apiMessage)
      }
      apiMessage = API_MESSAGE.ERROR
      reject(apiMessage)
      throw new Error(JSON.stringify(apiMessage))
    })
  }
  create(noteSale: NoteSale): Promise<ApiMessage> {
    let apiMessage: ApiMessage = API_MESSAGE.SUCCESS

    return new Promise<ApiMessage>((resolve, reject) => {
      let noteSalesString = localStorage.getItem(NOTE_SALES) || '[]'

      if (noteSalesString) {
        const noteSales: NoteSale[] = JSON.parse(noteSalesString)
        noteSales.push(noteSale)
        noteSalesString = JSON.stringify(noteSales)
        localStorage.setItem(NOTE_SALES, noteSalesString)
        resolve(apiMessage)
      }
      apiMessage = API_MESSAGE.ERROR
      reject(apiMessage)
      throw new Error(JSON.stringify(apiMessage))
    })
  }
  deleteById(id: string): Promise<ApiMessage> {
    let apiMessage: ApiMessage = API_MESSAGE.SUCCESS

    return new Promise<ApiMessage>((resolve, reject) => {
      let noteSalesString = localStorage.getItem(NOTE_SALES)

      if (noteSalesString) {
        const noteSales: NoteSale[] = JSON.parse(noteSalesString)
        const noteSaleFoundIndex: number = noteSales.findIndex((val) => (val.id = id))
        noteSales.splice(noteSaleFoundIndex, 1)
        noteSalesString = JSON.stringify(noteSales)
        localStorage.setItem(NOTE_SALES, noteSalesString)
        resolve(apiMessage)
      }
      apiMessage = API_MESSAGE.ERROR
      reject(apiMessage)
      throw new Error(JSON.stringify(apiMessage))
    })
  }
}

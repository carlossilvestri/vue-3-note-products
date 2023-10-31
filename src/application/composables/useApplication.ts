import { storeToRefs } from 'pinia'
import type { NoteSale } from '@/application/interfaces'
import { noteSaleService } from '../interfaces/index'
import { useCustomerStore } from '@/general/stores/customer'
import { fixValue } from '@/general/filters'

import { useNoteSale } from '@/application/stores/notesale'

export function useApplication() {
  const noteSalesPinia = useNoteSale()

  const customerStore = useCustomerStore()
  const { showPricesIn } = storeToRefs(customerStore)

  const updateNoteSaleSelected = () => {
    const noteSaleSelected: NoteSale = {
      ...noteSalesPinia.noteSaleSelected,
      noteItems: noteSalesPinia.noteSaleSelected.noteItems.map((val2) => {
        return {
          ...val2,
          note: {
            ...val2.note,
            total: convertPrice(val2.note.total),
            customer: { ...val2.note.customer, showPricesIn: showPricesIn.value }
          },
          item: {
            ...val2.item,
            price: convertPrice(val2.item.price),
            currency: showPricesIn.value
          },
          total: convertPrice(val2.total)
        }
      }),
      total: convertPrice(noteSalesPinia.noteSaleSelected?.total!)
    }
    noteSalesPinia.saveNoteSaleSelected(noteSaleSelected)
  }

  const convertPrice = (price: number): number => {
    return fixValue(price * customerStore.tasa, 2)
  }

  const updateNoteSales = () => {
    const noteSales: NoteSale[] = noteSalesPinia.noteSales.map((val) => {
      return {
        ...val,
        noteItems: val.noteItems.map((val2) => {
          return {
            ...val2,
            note: {
              ...val2.note,
              total: convertPrice(val2.note.total),
              customer: { ...val2.note.customer, showPricesIn: showPricesIn.value }
            },
            item: {
              ...val2.item,
              price: convertPrice(val2.item.price),
              currency: showPricesIn.value
            },
            total: convertPrice(val2.total)
          }
        }),
        total: convertPrice(val.total)
      }
    })
    noteSaleService.saveAll(noteSales)
    noteSalesPinia.save(noteSales)
  }

  return {
    noteSalesPinia,
    customerStore,
    showPricesIn,
    convertPrice,
    updateNoteSaleSelected,
    updateNoteSales
  }
}

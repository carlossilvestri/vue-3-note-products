import { defineStore } from 'pinia'
import { noteSaleService, type NoteSale, idGeneratorService } from '../interfaces'

export const useNoteSale = defineStore('notesale', {
  state: () =>
    ({
      noteSales: [],
      noteSaleSelected: { id: idGeneratorService.generateId(), noteItems: [], total: 0 }
    }) as {
      noteSales: NoteSale[]
      noteSaleSelected: NoteSale
    },

  actions: {
    save(noteSales: NoteSale[]) {
      this.noteSales = JSON.parse(JSON.stringify(noteSales))
    },
    deleteById(id: string) {
      noteSaleService.deleteById(id)
      const noteSaleFoundIndex: number = this.noteSales.findIndex((val) => (val.id = id))
      this.noteSales.splice(noteSaleFoundIndex, 1)
    },
    saveNoteSaleSelected(noteSaleSelected: NoteSale) {
      this.noteSaleSelected = JSON.parse(JSON.stringify(noteSaleSelected))
    }
  },
  getters: {
    getNoteSales: (state) => state.noteSales,
    getItems: (state) =>
      state.noteSales
        .map((val) => val.noteItems)
        .flat()
        .map((val) => val.item),
    getNoteSaleSelected: (state) => state.noteSaleSelected
  }
})

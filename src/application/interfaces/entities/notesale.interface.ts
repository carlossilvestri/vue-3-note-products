import type { NoteItem } from '..'

export interface NoteSale {
  id: string
  noteItems: NoteItem[]
  total: number
}

import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { items } from '../mock'
import type {
  NoteSale,
  Item,
  NoteItem,
  Note,
  Customer,
  ApiMessage,
  CreateNoteSaleProps
} from '../interfaces'
import { idGeneratorService, noteSaleService } from '../interfaces'
import { customerService } from '../../authentication/interfaces'
import { APPLICATION_ROUTE } from '../constants/router.constant'
import { useNoteSale } from '../stores/notesale'

// by convention, composable function names start with "use"
export function useCreateNote(props: CreateNoteSaleProps) {
  const noteSaleStore = useNoteSale()
  const { getNoteSaleSelected } = storeToRefs(noteSaleStore)

  const defaultNoteSale = props?.noteSale
    ? props.noteSale
    : { id: idGeneratorService.generateId(), noteItems: [], total: 0 }
  const noteSale = ref<NoteSale>(defaultNoteSale!)
  const itemArr = ref<Item[]>([])
  const selected = ref<Item>()
  const router = useRouter()

  itemArr.value = [...items]
  const options = ref([...items])

  const addNoteItem = async (item: Item) => {
    const customer: Customer = await customerService.getAuthenticated()
    const note: Note = {
      id: idGeneratorService.generateId(),
      customer,
      date: new Date(),
      total: item.price
    }

    const noteItem: NoteItem = {
      id: idGeneratorService.generateId(),
      note,
      item,
      quantity: 1,
      total: item.price,
      attach: ''
    }
    noteSale.value.noteItems.push(noteItem)
    updateNoteSaleTotal()
  }

  const updateNoteSaleTotal = () => {
    noteSale.value.total = noteSale.value.noteItems
      .map((val) => val.total)
      .reduce((accumulator, value) => accumulator + value, 0)
  }

  const onChangeQty = (index: number) => {
    const price: number = noteSale.value.noteItems[index].item.price
    const quantity: number = noteSale.value.noteItems[index].quantity

    noteSale.value.noteItems[index].total = price * quantity
    noteSale.value.noteItems[index].note.total = price * quantity

    updateNoteSaleTotal()
  }

  const deleteNote = (index: number) => {
    noteSale.value.noteItems.splice(index, 1)
    updateNoteSaleTotal()
  }

  const onSubmit = async (noteSale: NoteSale) => {
    if (props.noteSale) {
      await onEdit(noteSale)
    } else {
      await onCreate(noteSale)
    }
  }

  const onEdit = async (noteSale: NoteSale) => {
    const apiMessage: ApiMessage = await noteSaleService.save(noteSale)
    if (apiMessage.status == 200) {
      router.push(APPLICATION_ROUTE.APPLICATION)
      Swal.fire('Good job!', 'You have edited a note!', 'success')
    }
  }

  const onCreate = async (noteSale: NoteSale) => {
    const apiMessage: ApiMessage = await noteSaleService.create(noteSale)
    if (apiMessage.status == 200) {
      router.push(APPLICATION_ROUTE.APPLICATION)
      Swal.fire('Good job!', 'You have created a new note!', 'success')
    }
  }

  // Watchers
  watch(selected, (newSelected) => {
    if (newSelected) {
      addNoteItem(newSelected)
    }
  })
  watch(props, (newVal) => {
    if (newVal.noteSale) {
      noteSale.value = JSON.parse(JSON.stringify(props.noteSale))
    }
  })
  watch(getNoteSaleSelected, (newVal) => {
    if (newVal && newVal !== undefined) {
      noteSale.value = JSON.parse(JSON.stringify(newVal))
    }
  })
  // expose managed state as return value
  return {
    noteSale,
    itemArr,
    selected,
    options,
    onChangeQty,
    deleteNote,
    onCreate,
    onSubmit,
    onEdit
  }
}

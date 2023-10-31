import { CurrencyServiceImpl } from '../services/freecurrency/currencyserviceimpl'
import { NoteSaleServiceImplLocalStorage } from '../services/localstorage/notesaleserviceimpl'
import { IdGeneratorServiceImpl } from '../services/uuid/idgeneratorserviceimpl'
import type { CurrencyService } from './services/currencyservice.interface'
import type { IdGeneratorService } from './services/idgenerator.interface'
import type { NoteSaleService } from './services/notesaleservice.interface'

export type { CreateNoteSaleProps } from './props/createnotesaleform.interface'
export type { ApiMessage } from './api-response/apimessage.interface'
export type { Customer } from '../../authentication/interfaces'
export type { Item } from './entities/item.interface'
export type { Note } from './entities/note.interface'
export type { NoteItem } from './entities/noteitem.interface'
export type { ApplicationRoute } from './applicationroute.interface'
export type { NoteSale } from './entities/notesale.interface'
export type { NoteSaleService } from './services/notesaleservice.interface'
export type { NoteService } from './services/noteservice.interface'
export type { IdGeneratorService } from './services/idgenerator.interface'
export type { CurrencyPayloadFilter } from './props/currencypayloadfilter.interface'
export type { CurrencyValueResponse } from './api-response/currencyvalueresponse.interface'

export const noteSaleService: NoteSaleService = new NoteSaleServiceImplLocalStorage()
export const idGeneratorService: IdGeneratorService = new IdGeneratorServiceImpl()
export const currencyService: CurrencyService = new CurrencyServiceImpl()

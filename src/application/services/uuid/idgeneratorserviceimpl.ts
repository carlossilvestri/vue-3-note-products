import type { IdGeneratorService } from '@/application/interfaces'
import { v4 as uuidv4 } from 'uuid'

export class IdGeneratorServiceImpl implements IdGeneratorService {
  generateId(): string {
    return uuidv4()
  }
}

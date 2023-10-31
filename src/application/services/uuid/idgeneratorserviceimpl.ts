import type { IdGenerator } from "@/application/interfaces"
import { v4 as uuidv4 } from 'uuid'

export class IdGeneratorServiceImpl implements IdGenerator {
    generateId(): string {
        return uuidv4()
    }

}
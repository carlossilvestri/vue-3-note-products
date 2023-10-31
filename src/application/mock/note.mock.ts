import { customers } from "@/authentication/mock/customer.mock";
import { idGeneratorService, type Note } from "../interfaces";

export const notes : Note[] = [
    {
        id: idGeneratorService.generateId(),
        customer: customers[0],
        date: new Date(),
        total: 0
    }
]
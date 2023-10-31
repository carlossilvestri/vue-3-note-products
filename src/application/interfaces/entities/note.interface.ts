import type { Customer } from "..";

export interface Note {
    id: string;
    customer: Customer;
    date: Date;
    total: number;
}
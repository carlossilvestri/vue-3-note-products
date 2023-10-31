import type { Note, Item } from "..";

export interface NoteItem {
    id: string;
    note: Note;
    item: Item;
    quantity: number;
    total: number;
    attach: string;
}
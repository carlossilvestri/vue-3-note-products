import type { Note } from "..";

export interface NoteService {
    create(note: Note) : Promise<Note>
}
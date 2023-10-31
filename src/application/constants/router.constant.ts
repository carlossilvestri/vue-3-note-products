import type { ApplicationRoute } from "../interfaces";

export const ROUTE_NAME = 'application';

export const APPLICATION_ROUTE : ApplicationRoute = {
    APPLICATION: `/${ROUTE_NAME}`,
    CREATE_NOTE_SALE: `/${ROUTE_NAME}/note-sale/create`,
    LIST_NOTE_SALE: `/${ROUTE_NAME}/note-sale`,
    EDIT_NOTE_SALE: `/${ROUTE_NAME}/note-sale/id/:id`,
}
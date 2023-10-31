import type { RouteRecordRaw } from 'vue-router';
import { APPLICATION_ROUTE, ROUTE_NAME } from '../constants/router.constant';


export const applicationRoute: RouteRecordRaw = {
    path: APPLICATION_ROUTE.APPLICATION,
    name: ROUTE_NAME,
    redirect: APPLICATION_ROUTE.LIST_NOTE_SALE,
    component: () => import('@/application/views/ApplicationView.vue'),
    children: [
      {
        path: APPLICATION_ROUTE.CREATE_NOTE_SALE,
        name: `${ROUTE_NAME}-note-sale-create`,
        component: () => import('@/application/views/CreateNoteSaleView.vue'),
      },
      {
        path: APPLICATION_ROUTE.LIST_NOTE_SALE,
        name: `${ROUTE_NAME}-note-sale-list`,
        component: () => import('@/application/views/ListNoteSaleView.vue'),
      },
      {
        path: APPLICATION_ROUTE.EDIT_NOTE_SALE,
        name: `${ROUTE_NAME}-note-sale-edit`,
        component: () => import('@/application/views/EditNoteSaleView.vue'),
      }
    ]
  }
<script setup lang="ts">
import { useCustomerStore } from '@/general/stores/customer'
import { storeToRefs } from 'pinia'
import { type NoteSale } from '../interfaces'
import { APPLICATION_ROUTE } from '@/application/constants/router.constant'
import { useNoteSale } from '@/application/stores/notesale'

interface Props {
  noteSale: NoteSale
}
const props = defineProps<Props>()

const customerStore = useCustomerStore()
const { showPricesIn } = storeToRefs(customerStore)

const noteSalesPinia = useNoteSale()
</script>

<template>
  <div class="col-lg-4 mb-4">
    <div class="card">
      <div class="card-body" v-for="noteItem in props.noteSale.noteItems" :key="noteItem.id">
        <h4 class="card-title">{{ noteItem.item.name }}</h4>
        <h6 class="card-title">Quantity: {{ noteItem.quantity }}</h6>
        <h6 class="card-title">Subotal: {{ showPricesIn }} {{ noteItem.total }}</h6>
      </div>
      <div class="card-body">
        <h5 class="card-title mb-3">Total: {{ showPricesIn }} {{ props.noteSale.total }}</h5>
        <router-link
          :to="APPLICATION_ROUTE.EDIT_NOTE_SALE.replace(':id', props.noteSale.id)"
          class="btn btn-outline-success btn-sm"
          >Details</router-link
        >
        <button
          class="btn btn-outline-danger btn-sm ml-2"
          @click="noteSalesPinia.deleteById(props.noteSale.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
@/general/stores/customer

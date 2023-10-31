<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import VueMultiselect from 'vue-multiselect'
import { APPLICATION_ROUTE } from '@/application/constants/router.constant'
import { customerService } from '../../authentication/interfaces/index'
import { currencyService, type ApiMessage, type CurrencyValueResponse } from '../interfaces'
import { useCustomerStore } from '@/general/stores/customer'
import { useApplication } from '../composables/useApplication'

const router = useRouter()
const route = useRoute()
const isDisabled = computed(() => route.path.includes(APPLICATION_ROUTE.CREATE_NOTE_SALE))

const customerStore = useCustomerStore()
const { showPricesIn } = storeToRefs(customerStore)
const coins = ref<string[]>(['USD', 'EUR', 'GBP', 'JPY', 'BGN', 'RUB', 'AUD', 'BRL', 'CAD'])
const coinSelected = ref<string>(showPricesIn.value)

const { updateNoteSaleSelected } = useApplication()

const onLogout = async () => {
  const resp: ApiMessage = await customerService.logout()
  if (resp.status == 200) {
    router.push('/')
  }
}

watch(coinSelected, async (newVal, oldVal) => {
  const currencyValueResponse: CurrencyValueResponse = await currencyService.getCurrencyValuePerUSD(
    oldVal,
    newVal
  )
  await Promise.all([
    customerStore.changeTasa(currencyValueResponse.data[newVal]),
    customerStore.changeShowPrice(newVal)
  ])
  updateNoteSaleSelected()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link :to="APPLICATION_ROUTE.APPLICATION" class="navbar-brand"></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="APPLICATION_ROUTE.APPLICATION"
              class="nav-link active"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Username
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#" @click="onLogout">Logout</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <VueMultiselect
              v-model="coinSelected"
              :options="coins"
              placeholder="Select a currency"
              :disabled="isDisabled"
            >
            </VueMultiselect>
          </li>
        </ul>
        <router-link
          :to="APPLICATION_ROUTE.CREATE_NOTE_SALE"
          class="btn btn-outline-success"
          type="submit"
          >Add new note</router-link
        >
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
@/general/stores/customer

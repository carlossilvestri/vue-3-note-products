<script setup lang="ts">
import { onMounted, watch } from 'vue'
import CardComponent from '../components/CardComponent.vue'
import type { NoteSale } from '@/application/interfaces'
import { noteSaleService } from '../interfaces/index'

import { useApplication } from '../composables/useApplication'

const { noteSalesPinia, showPricesIn, updateNoteSales } = useApplication()

watch(showPricesIn, () => {
  updateNoteSales()
})

onMounted(async () => {
  const noteSales: NoteSale[] = await noteSaleService.getAll()
  noteSalesPinia.save(noteSales)
})
</script>
<template>
  <div>
    <section id="gallery" class="pt-5">
      <div class="container">
        <div class="row">
          <CardComponent
            v-for="noteSale in noteSalesPinia.noteSales"
            :key="`card-component-${noteSale.id}`"
            :noteSale="noteSale"
          />
          <div class="starter-template" v-if="!noteSalesPinia.noteSales.length">
            <h1>There's no notes</h1>
            <p class="lead">Please, create new notes clicking "Add new note" button.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
../../general/stores/customer

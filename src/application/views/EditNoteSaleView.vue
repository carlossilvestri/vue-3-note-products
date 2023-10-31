<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CreateNoteSaleForm from '../components/CreateNoteSaleForm.vue'
import type { NoteSale } from '../interfaces'
import { noteSaleService } from '../interfaces/index'
import { useNoteSale } from '../stores/notesale'

const id = ref<string>('')
const route = useRoute()
const noteSalesPinia = useNoteSale()

onMounted(async () => {
  if (Array.isArray(route.params.id)) {
    id.value = route.params['id'][0]
  } else {
    id.value = route.params.id
  }
  const noteSale: NoteSale = await noteSaleService.getbyId(id.value)
  noteSalesPinia.saveNoteSaleSelected(noteSale)
})
</script>

<template>
  <div class="vh-100 d-flex align-items-start">
    <CreateNoteSaleForm :noteSale="noteSalesPinia.noteSaleSelected" />
  </div>
</template>

<style scoped></style>

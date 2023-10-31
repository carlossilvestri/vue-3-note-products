<script setup lang="ts">
import VueMultiselect from 'vue-multiselect'
import { useCreateNote } from '../composables/useCreateNote'
import type { CreateNoteSaleProps } from '../interfaces'

const props = defineProps<CreateNoteSaleProps>()

const { noteSale, selected, options, onChangeQty, deleteNote, onSubmit } = useCreateNote(props)
</script>

<template>
  <div class="container mt-5">
    <form class="regForm">
      <div>
        <h2>Create a Note</h2>
        <VueMultiselect
          v-model="selected"
          :options="options"
          label="name"
          track-by="name"
          placeholder="Select an item"
        >
        </VueMultiselect>
        <div class="regForm">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(noteItem, index) in noteSale.noteItems"
              :key="`index-noteitem-${index}`"
            >
              <div class="d-flex justify-content-end">
                <span class="badge bg-danger rounded-pill pointer" @click="deleteNote(index)"
                  >X</span
                >
              </div>
              <div
                class="ms-2 me-auto d-flex justify-content-between align-items-start flex-column bd-highlight mb-3"
              >
                <div class="mb-3">
                  <h2>{{ noteItem.item.name }}</h2>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">Choose a picture</label>
                  <input class="form-control" type="file" id="formFile" />
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    aria-describedby="quantityHelp"
                    min="1"
                    v-model="noteItem.quantity"
                    @change="onChangeQty(index)"
                  />
                  <div id="quantityHelp" class="form-text">
                    The amount of {{ noteItem.item.name }} you want.
                  </div>
                </div>
                <div class="mb-3">
                  <h3>Subtotal: {{ noteItem.total }}</h3>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mb-3">
          <h1>Total: {{ noteSale.total }}</h1>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-success"
        @click="onSubmit(noteSale)"
        :disabled="!noteSale.noteItems.length"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
.regForm {
  background-color: #fafafa;
  margin: 0px auto;
  padding: 40px;
  border-radius: 10px;
}
</style>

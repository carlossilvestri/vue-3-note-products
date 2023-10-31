<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type Credentials } from '../interfaces'
import { APPLICATION_ROUTE } from '../../application/constants'
import { type ApiMessage } from '@/application/interfaces'
import { useCustomerStore } from '@/general/stores/customer'

const credentials = ref<Credentials>({ email: '', password: '' })
const router = useRouter()
const customerStore = useCustomerStore()

const onLogin = async () => {
  const resp: ApiMessage = await customerStore.login(credentials.value)

  if (resp.status == 200) {
    router.push(APPLICATION_ROUTE.APPLICATION)
  }
}
</script>

<template>
  <form>
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input
        type="email"
        id="form3Example3"
        class="form-control form-control-lg"
        placeholder="Enter a valid email address"
        v-model="credentials.email"
      />
      <label class="form-label" for="form3Example3">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-3">
      <input
        type="password"
        id="form3Example4"
        class="form-control form-control-lg"
        placeholder="Enter password"
        v-model="credentials.password"
      />
      <label class="form-label" for="form3Example4">Password</label>
    </div>

    <div class="text-center text-lg-start mt-4 pt-2">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        style="padding-left: 2.5rem; padding-right: 2.5rem"
        @click="onLogin"
      >
        Login
      </button>
    </div>
  </form>
</template>

<style scoped></style>

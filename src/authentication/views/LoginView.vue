<script setup lang="ts">
import LoginForm from '@/authentication/components/LoginForm.vue'
</script>

<template>
  <div>
    <section class="vh-100 d-flex flex-column justify-content-center">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

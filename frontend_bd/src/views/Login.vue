<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/functions'

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})

async function handleSubmit() {
  const success = await login(form.value)
  if (success) {
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/home')
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-center login" style="height: 100vh">
    <v-card width="400" elevation="8" class="pa-6 rounded-lg mx-auto" transition="fade-transition">
      <h2 class="text-h5 text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="handleSubmit"  class="text-center">
        <v-text-field label="Usuario" v-model="form.username" variant="outlined" />
        <v-text-field label="Contraseña" v-model="form.password" type="password" variant="outlined" />

        <v-btn block color="primary" type="submit">Ingresar</v-btn>
      </form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login{
    margin-left: 50%;
}
</style>
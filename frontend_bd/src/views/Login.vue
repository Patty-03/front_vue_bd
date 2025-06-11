<!-- views/Login.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Campos del formulario
const usuario = ref('')
const contrasena = ref('')

// Mostrar/ocultar contraseña
const showPassword = ref(false)

// Función de envío
async function handleSubmit() {
  if (!usuario.value || !contrasena.value) {
    alert('⚠️ Por favor ingrese usuario y contraseña')
    return
  }

  // Simulación de autenticación local
  if (usuario.value === 'admin' && contrasena.value === '123456') {
    // Si es correcto, redirige al Home
    router.push('/home')
  } else {
    alert('❌ Usuario o contraseña incorrectos')
  }
}
</script>

<template>
  <v-container class="d-flex align-center justify-center login" style="height: 100vh">
    <v-card width="400" elevation="8" class="pa-6 rounded-lg mx-auto ">
      <v-card-title class="text-h5 text-center mb-4">Iniciar Sesión</v-card-title>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="usuario"
          label="Usuario"
          variant="outlined"
          prepend-icon="mdi-account"
          required
          autocomplete="username"
        />
        <v-text-field
          v-model="contrasena"
          :type="showPassword ? 'text' : 'password'"
          label="Contraseña"
          variant="outlined"
          prepend-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          required
          autocomplete="current-password"
        />
        <v-btn block color="primary" type="submit" class="mt-4" size="large">
          <v-icon start>mdi-login</v-icon>
          Ingresar
        </v-btn>
      </v-form>
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
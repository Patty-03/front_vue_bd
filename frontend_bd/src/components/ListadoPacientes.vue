<template>
  <div>
    <h1>Pacientes</h1>
    <v-btn color="success" @click="openDialog = true" icon="mdi-plus"></v-btn>
    <AgregarPaciente v-model="openDialog" />
  </div>
</template>

<script setup>
import AgregarPaciente from './modals/AgregarPaciente.vue';
import { ref } from 'vue';

const openDialog = ref(false);
</script>
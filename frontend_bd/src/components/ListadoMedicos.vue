<template>
   <h1>Medicos</h1>
    <v-btn color="success" @click="openDialog = true" icon="mdi-plus"></v-btn>
    <AgregarMedico v-model="openDialog" />
</template>

<script setup>
import AgregarMedico from './modals/AgregarMedico.vue';
import { ref } from 'vue';

const openDialog = ref(false);
</script>
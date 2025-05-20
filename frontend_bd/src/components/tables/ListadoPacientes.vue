<script setup>
import { ref } from 'vue';

const headers = ref([
    "Nombre Hospital",
    "Departamento",
    "Unidad",
    "No. Historia Clinica",
    "Nombre",
    "Fecha Nacimiento",
    "Direccion"
])

const items = ref("Resultado de la consulta")
const openFilterPatients = ref(false)
const openFilterUnits = ref(false)
const addPatient = ref(false)
//INVESTIGAR COMO ORDENAR ALFABETICAMENTE
</script>

<template>
<h1>Listado Pacientes</h1>

</template>
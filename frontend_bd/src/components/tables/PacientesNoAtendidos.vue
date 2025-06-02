<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:8080/api/reportes/getPacientesNoAtendidos')
    if (!response.ok) throw new Error('Error al cargar datos')

    const jsonData = await response.json()
    data.value = jsonData.pacientes_no_atendidos || []
  } catch (err) {
    console.error(err)
    alert('No se pudieron cargar los datos')
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Pacientes no Atendidos</h1>
    <v-btn color="error" icon size="x-small" class="ml-2">
      <v-icon>mdi-file-pdf-box</v-icon>
    </v-btn>
  </v-container>

  <v-container fluid width="80vw">
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th
            v-for="header in [
              'Hospital',
              'Departamento',
              'Unidad',
              'Hist.Clinica',
              'Nombre',
              'Direccion',
              'Causa'
            ]"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in data"
          :key="idx"
          class="hover:bg-blue-lighten-5 transition-colors duration-200"
        >
          <td>{{ item.hospitalp }}</td>
          <td>{{ item.departamentop }}</td>
          <td>{{ item.unidadp }}</td>
          <td>{{ item.num_Historia_Clinica }}</td>
          <td>{{ item.nombre_Paciente }}</td>
          <td>{{ item.direccion_Paciente }}</td>
          <td>{{ item.causa }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
.v-table {
  max-width: 100vw;
}
.v-table th {
  background-color: #f0f0f0;
}
tr:hover {
  background-color: rgba(76, 175, 80, 0.1);
}
</style>

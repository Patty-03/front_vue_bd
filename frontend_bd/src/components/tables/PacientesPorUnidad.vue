<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { exportToPDF } from '@/utils/exportToPDF'

function exportarAPDF() {
  const headers = ['Hospital', 'Departamento', 'Unidad', 'Hist.Clinica', 'Nombre', 'Fecha Nac.', 'Dirección']
  const columns = ['hospital', 'departamento', 'unidad', 'id_paciente', 'paciente', 'fecha_nacido', 'direccion']
  exportToPDF(data.value, headers, columns, 'pacientes_por_unidad', 'Pacientes por Unidad')
}

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:9090/api/reportes/getPacientesPorUnidad')
    if (!response.ok) throw new Error('Error al cargar datos')

    const jsonData = await response.json()
    data.value = jsonData.pacientes || []
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
    <h1>Pacientes por Unidad</h1>
    <v-btn color="error" icon size="x-small" class="ml-2" @click="exportarAPDF">
      <v-icon>mdi-file-pdf-box</v-icon>
    </v-btn>
  </v-container>

<h2 v-if="data.length == 0">No hay contenido para mostrar</h2>
  <v-container fluid width="80vw" v-else>    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th
            v-for="header in [
              'Hospital',
              'Departamento',
              'Unidad',
              'Hist.Clinica',
              'Nombre',
              'Fecha de Nacimiento',
              'Direccion'
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
          <td>{{ item.hospital }}</td>
          <td>{{ item.departamento }}</td>
          <td>{{ item.unidad }}</td>
          <td>{{ item.id_paciente }}</td>
          <td>{{ item.paciente }}</td>
          <td>{{ item.fecha_nacido }}</td>
          <td>{{ item.direccion }}</td>
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

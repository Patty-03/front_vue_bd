<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { exportToPDF } from '@/utils/exportToPDF'
function exportarAPDF() {
  const headers = ['Hospital', 'Departamento', 'Unidad', 'Turno', 'Hora', 'Inicio', 'Atendidos', '% Atendidos', 'Alta']
  const columns = ['hospitalp', 'departamentop', 'unidadp', 'num_Turno', 'hora_informe', 'pacientes_inicio', 'pacientes_atendidos', 'porcentaje_atendidos', 'pacientes_alta']
  exportToPDF(data.value, headers, columns, 'resumen_proceso', 'Resumen del Proceso')
}

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:8080/api/reportes/getResumenProceso')
    if (!response.ok) throw new Error('Error al cargar datos')

    const jsonData = await response.json()
    data.value = jsonData.resumenes || []
  } catch (err) {
    console.error(err)
    alert('No se pudo cargar el resumen por hospitales')
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Resumen del proceso</h1>
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
              'Turno',
              'Hora',
              'Pacientes al inicio',
              'Pacientes Atendidos',
              'Porcentaje',
              'Pacientes no Atendidos',
              'Pacientes dados de alta',
              
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
          <td>{{ item.unidad }}</td>
          <td>{{ item.num_Turno }}</td>
          <td>{{ item.hora_informe }}</td>
          <td>{{ item.pacientes_inicio }}</td>
          <td>{{ item.pacientes_atendidos }}</td>
          <td>{{ item.porcentaje_atendidos }}%</td>
          <td>{{ item.pacientes_no_atendidos }}</td>
          <td>{{ item.pacientes_alta }}</td>
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

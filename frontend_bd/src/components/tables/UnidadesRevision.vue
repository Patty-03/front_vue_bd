<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import { exportToPDF } from '@/utils/exportToPDF'
function exportarAPDF() {
  const headers = ['Hospital', 'Departamento', 'Unidad', 'Turno', 'Médico', 'Atendidos', 'Asignados', '% Atendidos']
  const columns = ['hospitalp', 'departamentop', 'unidadp', 'num_Turno', 'medicop', 'cant_Pacientes_Atendidos', 'cant_Pacientes_Asignados', 'porcentaje_atendidos']
  exportToPDF(data.value, headers, columns, 'unidades_revision', 'Unidades Pendientes de Revisión')
}

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:9090/api/reportes/getRevisarUnidades')
    if (!response.ok) throw new Error('Error al cargar datos')

    const jsonData = await response.json()
    data.value = jsonData.unidades_a_revisar || []
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
    <h1>Unidades Pendientes de Revision</h1>
    <v-btn color="error" icon size="x-small" class="ml-2"  @click="exportarAPDF">
      <v-icon>mdi-file-pdf-box</v-icon>
    </v-btn>
  </v-container>

  <h2 v-if="data.length == 0">No hay contenido para mostrar</h2>
  <v-container fluid width="80vw" v-else>
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th
            v-for="header in [
              'Hospital',
              'Departamento',
              'Unidad',
              'Turno',
              'Médico',
              'Pacientes Atendidos',
              'Pacientes Asignados',
              '% Atendidos',
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
          <td>{{ item.num_Turno }}</td>
          <td>{{ item.medicop }}</td>
          <td>{{ item.cant_Pacientes_Atendidos }}</td>
          <td>{{ item.cant_Pacientes_Asignados }}</td>
          <td>{{ item.porcentaje_atendidos.toFixed(2) }}%</td>
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

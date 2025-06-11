<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { exportToPDF } from '@/utils/exportToPDF'
function exportarAPDF() {
  const headers = ['Hospital', 'Departamento', 'Unidad', 'Turno', 'Hora', 'Número Informe', 'Pac. Inicio', 'Pac. Admitidos', 'Pac. Alta', 'Pac. Atendidos']
  const columns = ['hospitalp', 'departamentop', 'unidadp', 'num_Turno', 'hora_informe', 'numero_informe', 'pacientes_inicio', 'pacientes_admitidos', 'pacientes_alta', 'pacientes_atendidos']
  exportToPDF(data.value, headers, columns, 'informe_consultas', 'Informe durante Consultas')
}

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:9090/api/reportes/getInformeConsultas')
    if (!response.ok) throw new Error('Error al cargar datos')

    const jsonData = await response.json()
    data.value = jsonData.informes || []
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
    <h1>Informes durante las consultas</h1>
    <v-btn color="error" icon size="x-small" class="ml-2" @click="exportarAPDF">
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
              'Hora',
              'No.',
              'Pacientes al inicio',
              'Pacientes admitidos',
              'Dados de alta',
              'Pacientes atendidos'
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
          <td>{{ item.hora_informep }}</td>
          <td>{{ item.numero_informep }}</td>
          <td>{{ item.pacientes_iniciop }}</td>
          <td>{{ item.pacientes_admitidosp }}</td>
          <td>{{ item.pacientes_altap }}</td>
          <td>{{ item.pacientes_atendidosp }}</td>
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

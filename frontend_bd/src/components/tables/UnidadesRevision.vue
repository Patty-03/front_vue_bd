<!-- views/reportes/ConsultasExitosas.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

function exportToPDF() {
  if (data.value.length === 0) {
    alert('No hay datos para exportar')
    return
  }

  const doc = new jsPDF({
    orientation: 'landscape'
  })

  // Título
  doc.setFontSize(18)
  doc.text("Reporte: Unidades Pendientes de Revisión", 14, 20)

  // Fecha
  const fechaActual = new Date().toLocaleDateString()
  doc.setFontSize(10)
  doc.text(`Generado el: ${fechaActual}`, 14, 28)

  // Datos de la tabla
  const headers = [
    ['Hospital', 'Departamento', 'Unidad', 'Turno', 'Médico', 'Atendidos', 'Asignados', '% Atendidos']
  ]

  const rows = data.value.map(item => [
    item.hospitalp,
    item.departamentop,
    item.unidadp,
    item.num_Turno,
    item.medicop,
    item.cant_Pacientes_Atendidos,
    item.cant_Pacientes_Asignados,
    `${item.porcentaje_atendidos.toFixed(2)}%`
  ])

  // Configuración de autoTable
  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 35,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak'
    },
    headStyles: {
      fillColor: [41, 128, 185], // Azul profesional
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245] // Gris claro para filas alternadas
    },
    margin: { left: 10, right: 10 },
    tableWidth: 'auto'
  })

  // Guardar PDF
  doc.save(`reporte_unidades_revision_${new Date().toISOString().slice(0,10)}.pdf`)
  alert('Documento guardado exitosamente')
}

const data = ref([])

// Cargar datos desde backend
async function cargarDatos() {
  try {
    const response = await fetch('http://localhost:8080/api/reportes/getRevisarUnidades')
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
    <v-btn color="error" icon size="x-small" class="ml-2"  @click="exportToPDF">
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

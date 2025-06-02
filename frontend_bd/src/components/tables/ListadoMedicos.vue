<script setup>
import { ref, onMounted } from 'vue'
import MedicoDialog from '@/components/modals/MedicoDialog.vue'
import { getAllMedicos, deleteMedico } from '@/functions.js'
import { exportToPDF } from '@/utils/exportToPDF'

function exportarAPDF() {
  const headersPDF = [
    'Cod. Médico', 'Nombre', 'Esp.', 'Licencia', 'Teléfono', 'Años Exp.', 'Contacto',
    'Unidad', 'Dpto.', 'Hospital'
  ]

  const columnsPDF = [
    'cod_medico', 'nombre_completo', 'especialidad', 'licencia', 'telefono',
    'anios_experiencia', 'contacto', 'unidad', 'departamento', 'hospital'
  ]

  exportToPDF(
    data.value,
    headersPDF,
    columnsPDF,
    'medicos_lista',
    'Listado de Médicos'
  )
}

// Datos reactivos
const data = ref([])
const openCreateDialog = ref(false)
const selectedMedico = ref(null)

// Encabezados de la tabla
const headers = ref([
  'Código Médico',
  'Nombre Completo',
  'Especialidad',
  'Licencia Médica',
  'Teléfono',
  'Años Experiencia',
  'Datos Contacto',
  'Unidad',
  'Departamento',
  'Hospital',
  'Acciones'
])

async function cargarDatos() {
  const medicos = await getAllMedicos()
  data.value = medicos.map(m => ({
    cod_medico: m.cod_Med,
    nombre_completo: `${m.nombre_Med} ${m.Apellidos}`,
    especialidad: m.especialidad,
    licencia: m.num_Licencia,
    telefono: m.telefono,
    anios_experiencia: m.anios_Expmed,
    contacto: m.datos_Contacto,
    unidad: m.cod_Unidad,
    departamento: m.cod_Dpto,
    hospital: m.cod_Hosp
  }))
}

function abrirModalAgregar() {
  selectedMedico.value = null
  openCreateDialog.value = true
}

function editarMedico(medico) {
  selectedMedico.value = medico
  openCreateDialog.value = true
}

async function handleDelete(codMed) {
  if (confirm('¿Estás seguro de eliminar este médico?')) {
    await deleteMedico(codMed)
    await cargarDatos()
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Médicos</h1>
    <v-btn color="success" icon size="x-small" class="ml-2" @click="abrirModalAgregar">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn color="error" icon size="x-small" class="ml-2" @click="exportarAPDF">
      <v-icon>mdi-file-pdf-box</v-icon>
    </v-btn>
  </v-container>

  <h2 v-if="data.length == 0">No hay contenido para mostrar</h2>
  <v-container fluid width="90vw" v-else>
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in data" :key="idx">
          <td>{{ item.cod_medico }}</td>
          <td>{{ item.nombre_completo }}</td>
          <td>{{ item.especialidad }}</td>
          <td>{{ item.licencia }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.anios_experiencia }}</td>
          <td>{{ item.contacto }}</td>
          <td>{{ item.unidad }}</td>
          <td>{{ item.departamento }}</td>
          <td>{{ item.hospital }}</td>
          <td class="d-flex justify-end" style="gap: 8px;">
            <v-btn icon size="x-small" color="primary" @click="editarMedico(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="x-small" color="red" @click="handleDelete(item.cod_medico)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Modal para agregar/editar -->
  <MedicoDialog
    v-model="openCreateDialog"
    :medico="selectedMedico"
    @submit="cargarDatos"
  />
</template>

<style scoped>
.v-table {
  max-width: 100vw;
}
.no-wrap {
  white-space: nowrap;
}
</style>
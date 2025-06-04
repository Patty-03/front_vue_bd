<script setup>
import { ref, onMounted } from 'vue'
import PacienteDialog from '@/components/modals/PacienteDialog.vue'
import { getPacientes, deletePaciente } from '@/functions'

const openCreateDialog = ref(false)
const selectedPaciente = ref(null)
const data = ref([])

const headers = ref([
  'Hist. Clínica',
  'Nombre', 
  'Fecha Nac.',
  'Dirección',
  'Acciones'
])

async function cargarDatos() {
  const pacientes = await getPacientes()
  data.value = pacientes.map(p => ({
    // Mantener nombres compatibles con el diálogo
    num_Historia_clinica: p.num_Historia_clinica,
    nombre_Paciente: p.nombre_Paciente,
    apellidos: p.apellidos || '', // Campo adicional si existe
    direccion_Paciente: p.direccion_Paciente,
    fecha_Nacimiento: p.fecha_Nacimiento,
    // Campos para visualización en tabla
    histClin: p.num_Historia_clinica,
    nombre: `${p.nombre_Paciente} ${p.apellidos || ''}`.trim(),
    fechaNac: p.fecha_Nacimiento,
    direccion: p.direccion_Paciente
  }))
}

function abrirModalAgregar() {
  selectedPaciente.value = null
  openCreateDialog.value = true
}

function editarPaciente(paciente) {
  // Pasar el objeto con los nombres que espera el diálogo
  selectedPaciente.value = {
    num_Historia_clinica: paciente.num_Historia_clinica,
    nombre_Paciente: paciente.nombre_Paciente,
    direccion_Paciente: paciente.direccion_Paciente,
    fecha_Nacimiento: paciente.fecha_Nacimiento
  }
  openCreateDialog.value = true
}

async function handleDelete(historia) {
  if (confirm('¿Estás seguro de eliminar este paciente?')) {
    await deletePaciente(historia)
    await cargarDatos()
  }
}

onMounted(() => {
   cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Pacientes</h1>
    <v-btn color="success" icon size="x-small" class="ml-2" @click="abrirModalAgregar">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>

<h2 v-if="data.length == 0">No hay contenido para mostrar</h2>
  <v-container fluid width="80vw" v-else>
    <v-table fixed-header height="400px">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header" class="no-wrap">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in data" :key="idx">
        <td>{{ item.histClin }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.fechaNac }}</td>
        <td>{{ item.direccion }}</td>
        <td >
          <v-btn icon size="x-small" color="primary" class="mr-2" @click="editarPaciente(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="x-small" color="red" @click="handleDelete(item.histClin)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  </v-container>
  
<PacienteDialog
    v-model="openCreateDialog"
    :paciente="selectedPaciente"
    @submit="cargarDatos" 
  />
</template>

<style scoped>
.v-table {
  max-width: 100vw;
}

.no-wrap{
  text-wrap: nowrap;
}
</style>
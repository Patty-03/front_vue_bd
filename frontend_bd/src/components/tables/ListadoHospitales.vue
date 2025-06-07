<!-- views/ListadoHospitales.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import HospitalDialog from '@/components/modals/HospitalDialog.vue'
import { getAllHospitals, deleteHospital } from '@/functions.js'

// Datos reactivos
const data = ref([])
const openCreateDialog = ref(false)
const selectedHospital = ref(null)

// Encabezados de la tabla
const headers = ref([
  'Código',
  'Nombre del Hospital',
  'Acciones'
])

async function cargarDatos() {
  const hospitales = await getAllHospitals()
  data.value = hospitales.map(h => ({
    cod_Hptal: h.cod_Hptal,
    nombre_hptal: h.nombre_hptal
  }))
}

function abrirModalAgregar() {
  selectedHospital.value = null
  openCreateDialog.value = true
}

function editarHospital(hospital) {
  selectedHospital.value = hospital
  openCreateDialog.value = true
}

async function eliminarHospital(cod) {
  if (confirm('¿Estás seguro de eliminar este hospital?')) {
    try {
      const resultado = await deleteHospital(cod)
      if (resultado.error) {
        alert(resultado.error)
      }
      await cargarDatos()
    } catch (err) {
      alert(`❌ Error al eliminar el hospital: ${err.message}`)
    }
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Hospitales</h1>
    <v-btn color="success" icon size="x-small" class="ml-2" @click="abrirModalAgregar">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>

  <h2 v-if="data.length == 0">No hay contenido para mostrar</h2>
  <v-container fluid width="80vw" v-else>
    <v-table fixed-header height="400px">
      <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in data" :key="idx">
        <td>{{ item.cod_Hptal }}</td>
        <td>{{ item.nombre_hptal }}</td>
        <td class="d-flex justify-start" style="gap: 8px;">
          <v-btn icon size="x-small" color="primary" title="Editar" @click="editarHospital(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon size="x-small" color="red" title="Eliminar" @click="eliminarHospital(item.cod_Hptal)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Modal para agregar/editar -->
  <HospitalDialog
      v-model="openCreateDialog"
      :hospital="selectedHospital"
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
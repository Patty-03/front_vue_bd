<!-- views/ListadoUnidad.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import UnidadDialog from '@/components/modals/UnidadDialog.vue'
import { getAllUnidades, deleteUnidad } from '@/functions.js'

// Datos reactivos
const data = ref([])
const openCreateDialog = ref(false)
const selectedUnidad = ref(null)

// Encabezados de la tabla
const headers = ref([
  'Código',
  'Nombre de Unidad',
  'Ubicación Hospital',
  'Departamento',
  'Acciones'
])

async function cargarDatos() {
  const unidades = await getAllUnidades()
  data.value = unidades.map(u => ({
    cod_Unidad: u.cod_Unidad,
    nombre_Unidad: u.nombre_Unidad,
    ubic_Hptal: u.ubicacion_Hptal,
    cod_Dpto: u.cod_Dpto
  }))
}

function abrirModalAgregar() {
  selectedUnidad.value = null
  openCreateDialog.value = true
}

function editarUnidad(unidad) {
  selectedUnidad.value = unidad
  openCreateDialog.value = true
}

async function eliminarUnidad(cod) {
  if (confirm('¿Estás seguro de eliminar esta unidad?')) {
    try {
      await deleteUnidad(cod)
      await cargarDatos()
    } catch (err) {
      alert(`❌ Error al eliminar: ${err.message}`)
    }
  }
}

onMounted(() => {
  cargarDatos()
})
</script>

<template>
  <v-container class="d-flex flex-row align-center justify-start">
    <h1>Unidades</h1>
    <v-btn color="success" icon size="x-small" class="ml-2" @click="abrirModalAgregar">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>

  <v-container fluid width="80vw">
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in data" :key="idx">
          <td>{{ item.cod_Unidad }}</td>
          <td>{{ item.nombre_Unidad }}</td>
          <td>{{ item.ubic_Hptal }}</td>
          <td>{{ item.cod_Dpto }}</td>
          <td class="d-flex justify-start" style="gap: 8px;">
            <v-btn icon size="x-small" color="primary" title="Editar" @click="editarUnidad(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="x-small" color="red" title="Eliminar" @click="eliminarUnidad(item.cod_Unidad)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Modal para agregar/editar -->
  <UnidadDialog
    v-model="openCreateDialog"
    :unidad="selectedUnidad"
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
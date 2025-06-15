<script setup>
import { ref, onMounted, computed } from 'vue'
import UnidadDialog from '@/components/modals/UnidadDialog.vue'
import { getAllUnidades, deleteUnidad } from '@/functions.js'
import InformeDialog from '../modals/InformeDialog.vue'

// Datos reactivos
const data = ref([])
const dialogVisible = ref(false)
const selectedUnidad = ref(null)
const successDialog = ref(false)
const informeDialogVisible = ref(false)

// Filtros
const hospitales = ref([])
const departamentos = ref([])

const selectedHospital = ref('')
const selectedDepartamento = ref('')

// Encabezados de la tabla
const headers = ref([
  'Código',
  'Nombre de Unidad',
  'Ubicación Hospital',
  'Departamento',
  'Hospital',
  'Acciones'
])

async function cargarDatos() {
  const unidades = await getAllUnidades()
  data.value = unidades.map(u => ({
    cod_Unidad: u.cod_Unidad,
    nombre_Unidad: u.nombre_Unidad,
    ubicacion_Hptal: u.ubicacion_Hptal,
    cod_Dpto: u.cod_Dpto,
    cod_Hptal: u.cod_Hptal
  }))

  // Cargar opciones para filtros
  hospitales.value = [...new Set(data.value.map(d => d.cod_Hptal))]
  departamentos.value = [...new Set(data.value.map(d => d.cod_Dpto))]
}

function abrirModalAgregar() {
  selectedUnidad.value = null
  dialogVisible.value = true
}

function editarUnidad(unidad) {
  selectedUnidad.value = {...unidad}
  dialogVisible.value = true
}

async function eliminarUnidad(cod_Hptal, cod_Dpto, cod_Unidad) {
  if (confirm('¿Estás seguro de eliminar esta unidad?')) {
    try {
      const resultado = await deleteUnidad(cod_Hptal, cod_Dpto, cod_Unidad)
      if (resultado.error) {
        alert(resultado.error)
      }
      await cargarDatos()
    } catch (err) {
      alert(`❌ Error al eliminar unidad: ${err.message}`)
    }
  }
}

function generarInforme(unidad) {
  selectedUnidad.value = {...unidad}
  informeDialogVisible.value = true
}

// Filtrar datos dinámicamente
const filteredData = computed(() => {
  return data.value.filter(item => {
    let match = true
    if (selectedHospital.value) match &&= item.cod_Hptal === selectedHospital.value
    if (selectedDepartamento.value) match &&= item.cod_Dpto === selectedDepartamento.value
    return match
  })
})

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

  <!-- FILTROS -->
  <v-container fluid class="mt-4">
    <v-row dense>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedHospital"
          :items="hospitales"
          label="Filtrar por Hospital"
          clearable
          hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedDepartamento"
          :items="departamentos"
          label="Filtrar por Departamento"
          clearable
          hide-details
        />
      </v-col>
    </v-row>
  </v-container>

  <h2 v-if="filteredData.length == 0">No hay unidades con esos filtros</h2>
  <v-container fluid width="80vw" v-else>
    <v-table fixed-header height="400px">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in filteredData" :key="idx">
          <td>{{ item.cod_Unidad }}</td>
          <td>{{ item.nombre_Unidad }}</td>
          <td>{{ item.ubicacion_Hptal }}</td>
          <td>{{ item.cod_Dpto }}</td>
          <td>{{ item.cod_Hptal }}</td>
          <td class="d-flex justify-start" style="gap: 8px;">
            <v-btn icon size="x-small" color="primary" title="Editar" @click="editarUnidad(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="x-small" color="red" title="Eliminar"
                   @click="eliminarUnidad(item.cod_Hptal,item.cod_Dpto,item.cod_Unidad)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="warning" icon size="x-small" title="Generar informe" @click="generarInforme(item)">
              <v-icon>mdi-clipboard-text</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>

  <!-- Modal para agregar/editar -->
  <UnidadDialog
    v-model="dialogVisible"
    :unidad="selectedUnidad"
    @success="onSuccess"
  />

  <!-- Diálogo de éxito -->
  <v-dialog v-model="successDialog" max-width="500px">
    <v-card class="pa-4 text-center">
      <v-card-title>Operación realizada con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="successDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <InformeDialog
    v-model="informeDialogVisible"
    :unidad="selectedUnidad"
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
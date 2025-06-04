<script setup>
import { ref, onMounted } from 'vue'
import UnidadDialog from '@/components/modals/UnidadDialog.vue'
import { getAllUnidades, deleteUnidad } from '@/functions.js'
import InformeDialog from '../modals/InformeDialog.vue'

// Datos reactivos
const data = ref([])
const dialogVisible = ref(false) // Cambiado de openCreateDialog a dialogVisible para mayor claridad
const selectedUnidad = ref(null)
const successDialog = ref(false) // Diálogo de éxito
const informeDialogVisible = ref(false)

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
    ubic_Hptal: u.ubicacion_Hptal,
    cod_Dpto: u.cod_Dpto,
    cod_Hptal: u.cod_Hptal // Asegúrate de incluir este campo
  }))
}

function abrirModalAgregar() {
  selectedUnidad.value = null
  dialogVisible.value = true
}

function editarUnidad(unidad) {
  selectedUnidad.value = { ...unidad } // Copiamos el objeto para evitar mutaciones
  dialogVisible.value = true
}

async function eliminarUnidad(item) {
  if (confirm('¿Estás seguro de eliminar esta unidad?')) {
    try {
      // Verificar que los códigos sean números válidos
      if (isNaN(item.cod_Unidad)) throw new Error('Código de unidad inválido')
      if (isNaN(item.cod_Dpto)) throw new Error('Código de departamento inválido')
      if (isNaN(item.cod_Hosp)) throw new Error('Código de hospital inválido')
      
      await deleteUnidad(
        Number(item.cod_Unidad),
        Number(item.cod_Dpto),
        Number(item.cod_Hosp)
      )
      await cargarDatos()
    } catch (err) {
      alert(`❌ Error al eliminar: ${err.message}`)
    }
  }
}

function onSuccess() {
  dialogVisible.value = false
  successDialog.value = true
  cargarDatos()
}

function generarInforme(unidad) {
  selectedUnidad.value = { ...unidad } // Copiamos para evitar mutaciones
  informeDialogVisible.value = true
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
          <td>{{ item.cod_Unidad }}</td>
          <td>{{ item.nombre_Unidad }}</td>
          <td>{{ item.ubic_Hptal }}</td>
          <td>{{ item.cod_Dpto }}</td>
          <td>{{ item.cod_Hptal }}</td>
          <td class="d-flex justify-start" style="gap: 8px;">
            <v-btn icon size="x-small" color="primary" title="Editar" @click="editarUnidad(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="x-small" color="red" title="Eliminar" @click="eliminarUnidad(item.cod_Unidad)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn color="warning" icon size="x-small" title="Generar informe" @click="generarInforme(item)"><v-icon>mdi-clipboard-text</v-icon></v-btn>
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
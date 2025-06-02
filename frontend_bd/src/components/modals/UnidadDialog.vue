<!-- components/modals/UnidadDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createUnidad, updateUnidad } from '@/functions.js'

// Props del componente
const props = defineProps({
  unidad: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos
const cod_Unidad = ref('')
const nombre_Unidad = ref('')
const ubic_Hptal = ref('')
const cod_Dpto = ref(0)
const cod_Hosp = ref(0)

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.unidad, (nuevo) => {
  if (nuevo) {
    cod_Unidad.value = nuevo.cod_Unidad
    nombre_Unidad.value = nuevo.nombre_Unidad
    ubic_Hptal.value = nuevo.ubic_Hptal
    cod_Dpto.value = nuevo.cod_Dpto
    cod_Hosp.value = nuevo.cod_Hosp
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  cod_Unidad.value = ''
  nombre_Unidad.value = ''
  ubic_Hptal.value = ''
  cod_Dpto.value = 0
  cod_Hosp.value = 0
}

async function handleSubmit() {
  // Validaciones básicas
  if (!cod_Unidad.value || !nombre_Unidad.value.trim()) {
    alert('Completa todos los campos obligatorios')
    return
  }

  const datos = {
    cod_Unidad: parseInt(cod_Unidad.value),
    nombre_Unidad: nombre_Unidad.value,
    ubic_Hptal: ubic_Hptal.value,
    cod_Dpto: parseInt(cod_Dpto.value),
    cod_Hosp: parseInt(cod_Hosp.value)
  }

  try {
    if (isEdit.value) {
      await updateUnidad(datos.cod_Unidad, datos)
    } else {
      await createUnidad(datos)
    }

    emit('update:modelValue', false)
    creationDialog.value = true
  } catch (err) {
    console.error(err)
    alert(`❌ Error al guardar: ${err.message}`)
  }
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="600"
    persistent
  >
    <v-card>
      <v-card-title>{{ isEdit ? 'Editar Unidad' : 'Nueva Unidad' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Código de Unidad" v-model.number="cod_Unidad" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Nombre de Unidad" v-model="nombre_Unidad" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Ubicación en el hospital" v-model="ubic_Hptal" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Departamento" v-model.number="cod_Dpto" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Hospital" v-model.number="cod_Hosp" required />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="success" @click="handleSubmit">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Diálogo de éxito -->
  <v-dialog v-model="creationDialog" max-width="500px">
    <v-card class="pa-4 text-center">
      <v-card-title>{{ isEdit ? 'Unidad actualizada' : 'Unidad creada' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
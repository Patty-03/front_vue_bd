<!-- components/modals/HospitalDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createHospital, updateHospital } from '@/functions.js'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  hospital: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos del formulario
const cod_Hptal = ref('')
const nombre_hptal = ref('')

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.hospital, (nuevo) => {
  if (nuevo) {
    cod_Hptal.value = nuevo.cod_Hptal
    nombre_hptal.value = nuevo.nombre_hptal
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  cod_Hptal.value = ''
  nombre_hptal.value = ''
}

async function handleSubmit() {
  // Validación básica
  if (!cod_Hptal.value || !nombre_hptal.value.trim()) {
    alert('Completa todos los campos obligatorios')
    return
  }

  const datos = {
    cod_Hptal: parseInt(cod_Hptal.value),
    nombre_hptal: nombre_hptal.value.trim()
  }

  try {
    if (isEdit.value) {
      await updateHospital(datos)
    } else {
      await createHospital(datos)
    }

    emit('submit')
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
      <v-card-title>{{ isEdit ? 'Editar Hospital' : 'Nuevo Hospital' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Código del Hospital" v-model.number="cod_Hptal" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Nombre del Hospital" v-model="nombre_hptal" required />
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
  <v-dialog v-model="creationDialog" max-width="500px" transition="dialog-transition">
    <v-card class="pa-4 text-center">
      <v-card-title>{{ isEdit ? 'Hospital actualizado' : 'Hospital creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
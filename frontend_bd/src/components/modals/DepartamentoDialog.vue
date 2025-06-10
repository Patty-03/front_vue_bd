<!-- components/modals/DepartamentoDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createDepartamento, updateDepartamento } from '@/functions.js'

// Props del componente
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  departamento: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos del formulario
const cod_Dpto = ref('')
const nombre_Dpto = ref('')
const cod_Hptal = ref('')

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.departamento, (nuevo) => {
  if (nuevo) {
    cod_Dpto.value = nuevo.cod_Dpto
    nombre_Dpto.value = nuevo.nombre_Dpto
    cod_Hptal.value = nuevo.cod_Hptal
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  cod_Dpto.value = ''
  nombre_Dpto.value = ''
  cod_Hptal.value = ''
}

async function handleSubmit() {
  // Validaciones básicas
  if (!cod_Dpto.value || !nombre_Dpto.value.trim()) {
    alert('Completa todos los campos obligatorios')
    return
  }

  const datos = {
    cod_Dpto: parseInt(cod_Dpto.value),
    nombre_Dpto: nombre_Dpto.value.trim(),
    cod_Hptal: parseInt(cod_Hptal.value)
  }

  try {
    if (isEdit.value) {
      await updateDepartamento(datos)
    } else {
      await createDepartamento(datos)

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
      <v-card-title>{{ isEdit ? 'Editar Departamento' : 'Nuevo Departamento' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Código del Departamento" v-model.number="cod_Dpto" required: disabled="isEdit"/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Nombre del Departamento" v-model="nombre_Dpto" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código del Hospital" v-model.number="cod_Hptal" required:disabled="isEdit" />
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
      <v-card-title>{{ isEdit ? 'Departamento actualizado' : 'Departamento creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
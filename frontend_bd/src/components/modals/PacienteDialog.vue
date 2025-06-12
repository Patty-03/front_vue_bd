<script setup>
import { createPaciente, updatePaciente } from '@/functions' 
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  paciente: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos
const num_Historia_clinica = ref('')
const nombre_Paciente = ref('')
const fecha_Nacimiento = ref('')
const direccion_Paciente = ref('')
const isEdit = ref(false)
const errorMessage = ref('') // Para mostrar errores

// Observa cambios en la prop 'paciente'
watch(
  () => props.paciente,
  (nuevo) => {
    if (nuevo) {
      num_Historia_clinica.value = nuevo.num_Historia_clinica || ''
      nombre_Paciente.value = nuevo.nombre_Paciente || ''
      direccion_Paciente.value = nuevo.direccion_Paciente || ''
      // Asegurar formato de fecha YYYY-MM-DD
      fecha_Nacimiento.value = nuevo.fecha_Nacimiento ? 
        nuevo.fecha_Nacimiento.split('T')[0] : ''
      isEdit.value = true
    } else {
      limpiarFormulario()
      isEdit.value = false
    }
  },
  { immediate: true }
)

function limpiarFormulario() {
  num_Historia_clinica.value = ''
  nombre_Paciente.value = ''
  fecha_Nacimiento.value = ''
  direccion_Paciente.value = ''
  errorMessage.value = ''
}

const creationDialog = ref(false)

async function handleSubmit() {
  // Validaciones básicas
  if (!num_Historia_clinica.value || !nombre_Paciente.value.trim() || !fecha_Nacimiento.value) {
    errorMessage.value = 'Historia clínica, nombre y fecha de nacimiento son obligatorios'
    return
  }

  const datos = {
    num_Historia_clinica: num_Historia_clinica.value,
    nombre_Paciente: nombre_Paciente.value,
    direccion_Paciente: direccion_Paciente.value,
    fecha_Nacimiento: fecha_Nacimiento.value // Asegurar formato YYYY-MM-DD
  }

  try {
    let resultado
    if (isEdit.value) {
      resultado = await updatePaciente(num_Historia_clinica.value, datos)
    } else {
      resultado = await createPaciente(datos)
    }

    if (resultado.success) {
      emit('submit')
      emit('update:modelValue', false)
      creationDialog.value = true
    } else {
      errorMessage.value = resultado.error || 'Error al guardar los cambios'
    }
  } catch (err) {
    console.error('Error:', err)
    errorMessage.value = err.response?.data?.error || err.message || 'Error desconocido'
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
      <v-card-title>{{ isEdit ? 'Editar Paciente' : 'Nuevo Paciente' }}</v-card-title>
      <v-card-text>
        <!-- Mensaje de error -->
        <v-alert
          v-if="errorMessage"
          type="error"
          class="mb-4"
        >
          {{ errorMessage }}
        </v-alert>
        
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                label="No. Historia Clínica"
                v-model.number="num_Historia_clinica"
                required
                :disabled="isEdit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                label="Nombre del Paciente" 
                v-model="nombre_Paciente" 
                required 
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Fecha de Nacimiento"
                type="date"
                v-model="fecha_Nacimiento"
                required
                :max="new Date().toISOString().split('T')[0]"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea 
                label="Dirección Particular" 
                v-model="direccion_Paciente" 
                rows="2" 
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="$emit('update:modelValue', false)">
          Cancelar
        </v-btn>
        <v-btn color="success" @click="handleSubmit">
          {{ isEdit ? 'Actualizar' : 'Guardar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Diálogo de éxito -->
  <v-dialog v-model="creationDialog" max-width="500px">
    <v-card class="pa-4 text-center">
      <v-card-title>{{ isEdit ? 'Paciente actualizado' : 'Paciente creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
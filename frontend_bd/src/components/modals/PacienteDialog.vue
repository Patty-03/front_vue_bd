<!-- components/modals/PacienteDialog.vue -->
<script setup>
import { createPaciente } from '@/functions'
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

// Observa cambios en la prop 'paciente'
watch(
  () => props.paciente,
  (nuevo) => {
    if (nuevo) {
      // Usa los campos correctos según el formato que le mandes
      num_Historia_clinica.value = nuevo.num_Historia_clinica || nuevo.histClin
      nombre_Paciente.value = nuevo.nombre_Paciente || nuevo.nombre?.split(' ')[0] || ''
      direccion_Paciente.value = nuevo.direccion_Paciente || nuevo.direccion
      fecha_Nacimiento.value = nuevo.fecha_Nacimiento || nuevo.fechaNac
      isEdit.value = true
    } else {
      limpiarFormulario()
      isEdit.value = false
    }
  },
  { immediate: true },
)
const text = ref('')

function limpiarFormulario() {
  num_Historia_clinica.value = ''
  nombre_Paciente.value = ''
  fecha_Nacimiento.value = ''
  direccion_Paciente.value = ''
}

const creationDialog = ref(false)

async function handleSubmit() {
  const datos = {
    num_Historia_clinica: num_Historia_Clinica.value,
    nombre_Paciente: nombre_Paciente.value,
    direccion_Paciente: direccion_Paciente.value,
    fecha_Nacimiento: fecha_Nacimiento.value,
  }

  emit('update:modelValue', false)

  text.value = await createPaciente(datos)
  alert(text.value)
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
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                label="No. Historia Clínica"
                v-model.number="num_Historia_Clinica"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Nombre del Paciente" v-model="nombre_Paciente" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Fecha de Nacimiento"
                type="date"
                v-model="fecha_Nacimiento"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea label="Dirección Particular" v-model="direccion_Paciente" rows="2" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="$emit('update:modelValue', false)"
          >Cancelar</v-btn
        >
        <v-btn color="success" @click="handleSubmit">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

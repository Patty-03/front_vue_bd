<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import {createMedico} from '@/functions.js'

// Definición de props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  medico: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos del formulario
const cod_Med = ref('')
const nombre_Med = ref('')
const apellidos = ref('')
const especialidad = ref('')
const num_Licencia = ref(0)
const telefono = ref('')
const anios_Expmed = ref(0)
const datos_Contacto = ref('')
const cod_Unidad = ref(0)

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.medico, (nuevo) => {
  if (nuevo) {
    cod_Med.value = nuevo.cod_med
    nombre_Med.value = nuevo.nombre_Med
    apellidos.value = nuevo.Apellidos
    especialidad.value = nuevo.especialidad
    num_Licencia.value = nuevo.num_Licencia
    telefono.value = nuevo.telefono
    anios_Expmed.value = nuevo.anios_Expmed
    datos_Contacto.value = nuevo.datos_Contacto
    cod_Unidad.value = nuevo.cod_Unidad
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  cod_Med.value = ''
  nombre_Med.value = ''
  apellidos.value = ''
  especialidad.value = ''
  num_Licencia.value = 0
  telefono.value = ''
  anios_Expmed.value = 0
  datos_Contacto.value = ''
  cod_Unidad.value = 0
}

async function handleSubmit() {
  // Validaciones básicas
  if (!cod_Med.value || !nombre_Med.value.trim() || !especialidad.value.trim()) {
    alert('Completa los campos obligatorios')
    return
  }

  const datos = {
    cod_Med: cod_Med.value,
    nombre_Med: nombre_Med.value,
    Apellidos: apellidos.value,
    especialidad: especialidad.value,
    num_Licencia: num_Licencia.value,
    telefono: telefono.value,
    anios_Expmed: anios_Expmed.value,
    datos_Contacto: datos_Contacto.value,
    cod_Unidad: cod_Unidad.value
  }

  try {
    if (isEdit.value) {
      await updateMedico(datos.cod_Med, datos)
    } else {
      await createMedico(datos)
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
      <v-card-title>{{ isEdit ? 'Editar Médico' : 'Nuevo Médico' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Médico" v-model.number="cod_Med" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Nombre del Médico" v-model="nombre_Med" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Apellidos" v-model="apellidos" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Especialidad" v-model="especialidad" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Licencia Médica" v-model.number="num_Licencia" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Teléfono" v-model="telefono" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Años de experiencia" type="number" v-model.number="anios_Expmed" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Datos de contacto" v-model="datos_Contacto" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Unidad" v-model.number="cod_Unidad" required />
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
      <v-card-title>{{ isEdit ? 'Médico actualizado' : 'Médico creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
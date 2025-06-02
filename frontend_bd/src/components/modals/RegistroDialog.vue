<!-- components/modals/RegistroDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createRegistro, updateRegistro } from '@\/functions.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  registro: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos del formulario
const num_Historia_clinica = ref('')
const cod_Unidad = ref(0)
const fue_Atendido = ref(false)
const causa_No_Atendido = ref('')
const fecha_Registro = ref('')

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.registro, (nuevo) => {
  if (nuevo) {
    num_Historia_clinica.value = nuevo.num_Historia_clinica
    cod_Unidad.value = nuevo.cod_Unidad
    fue_Atendido.value = nuevo.fue_Atendido
    causa_No_Atendido.value = nuevo.causa_No_Atendido || ''
    fecha_Registro.value = nuevo.fecha_Registro

    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  num_Historia_clinica.value = ''
  cod_Unidad.value = 0
  fue_Atendido.value = false
  causa_No_Atendido.value = ''
  fecha_Registro.value = ''
}

async function handleSubmit() {
  // Validación básica
  if (!num_Historia_clinica.value || !cod_Unidad.value) {
    alert('Completa los campos obligatorios')
    return
  }

  const datos = {
    num_Historia_clinica: num_Historia_clinica.value,
    cod_Unidad: cod_Unidad.value,
    fue_Atendido: fue_Atendido.value,
    causa_No_Atendido: causa_No_Atendido.value,
    fecha_Registro: fecha_Registro.value
  }

  try {
    if (isEdit.value) {
      await updateRegistro(datos.num_Historia_clinica, datos)
    } else {
      await createRegistro(datos)
    }

    emit('submit')
    emit('update:modelValue', false)
    creationDialog.value = true
  } catch (err) {
    alert(`❌ Error al guardar: ${err.message}`)
    console.error(err)
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
      <v-card-title>{{ isEdit ? 'Editar Registro' : 'Nuevo Registro' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Número Historia Clínica" v-model.number="num_Historia_clinica" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código de Unidad" v-model.number="cod_Unidad" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="['Sí', 'No']"
                label="¿Fue atendido?"
                v-model="fue_Atendido"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Causa No Atendido" v-model="causa_No_Atendido" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Fecha de Registro" type="date" v-model="fecha_Registro" />
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
      <v-card-title>{{ isEdit ? 'Registro actualizado' : 'Registro creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
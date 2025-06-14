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
const num_Historia_Clinica = ref('')
const cod_Unidad = ref(0)
const fue_Atendido = ref(false)
const causa_No_Atendido = ref('')
const estado = ref('Activo') // Valor por defecto
const fecha_Registro = ref('')
const cod_Hptal = ref(0)
const cod_Dpto = ref(0)

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.registro, (nuevo) => {
  if (nuevo) {
    num_Historia_Clinica.value = nuevo.num_Historia_Clinica
    cod_Unidad.value = nuevo.cod_Unidad
    fue_Atendido.value = nuevo.fue_Atendido
    causa_No_Atendido.value = nuevo.causa_No_Atendido || ''
    estado.value = nuevo.estado || 'Activo'
    fecha_Registro.value = nuevo.fecha_Registro
    cod_Hptal.value = nuevo.cod_Hptal || 0
    cod_Dpto.value = nuevo.cod_Dpto || 0

    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  num_Historia_Clinica.value = ''
  cod_Unidad.value = 0
  fue_Atendido.value = false
  causa_No_Atendido.value = ''
  estado.value = 'Activo'
  fecha_Registro.value = ''
  cod_Hptal.value = 0
  cod_Dpto.value = 0
}

async function handleSubmit() {
  // Validación básica
  if (!num_Historia_Clinica.value || !cod_Unidad.value || !estado.value) {
    alert('Completa los campos obligatorios')
    return
  }

  const datos = {
    num_Historia_Clinica: num_Historia_Clinica.value,
    cod_Unidad: cod_Unidad.value,
    fue_Atendido: fue_Atendido.value,
    causa_No_Atendido: causa_No_Atendido.value || null,
    estado: estado.value,
    fecha_Registro: fecha_Registro.value || new Date().toISOString().split('T')[0],
    cod_Hptal: cod_Hptal.value,
    cod_Dpto: cod_Dpto.value
  }

  try {
    if (isEdit.value) {
      await updateRegistro(datos.num_Historia_Clinica, datos)
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
              <v-text-field
                label="Número Historia Clínica"
                v-model.number="num_Historia_Clinica"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Código de Unidad"
                v-model.number="cod_Unidad"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="¿Fue atendido?"
                v-model="fue_Atendido"
                :items="[{ text: 'Sí', value: true }, { text: 'No', value: false }]"
                item-title="text"
                item-value="value"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Causa No Atendido"
                v-model="causa_No_Atendido"
                :disabled="fue_Atendido"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                label="Estado"
                v-model="estado"
                :items="['Estable', 'Crítico', 'En espera', 'Alta']"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Fecha de Registro"
                type="date"
                v-model="fecha_Registro"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Código Hospital"
                v-model.number="cod_Hptal"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                label="Código Departamento"
                v-model.number="cod_Dpto"
                required
              />
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
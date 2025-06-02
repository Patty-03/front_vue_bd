<!-- components/modals/InformeDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createInforme, updateInforme } from '@/functions.js'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  informe: {
    type: Object,
    default: null
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'submit'])

// Campos reactivos del formulario
const num_Inf = ref('')
const cod_Unidad = ref(0)
const fecha_Inf = ref('')
const hora_Inf = ref('')
const cant_PacAt = ref(0)
const cant_PacAlta = ref(0)
const cant_PacAdm = ref(0)
const cant_TotalPac = ref(0)
const num_Turno = ref(0)

const isEdit = ref(false)
const creationDialog = ref(false)

// Cargar datos si estamos editando
watch(() => props.informe, (nuevo) => {
  if (nuevo) {
    num_Inf.value = nuevo.num_Inf
    cod_Unidad.value = nuevo.cod_Unidad
    fecha_Inf.value = nuevo.fecha_Inf
    hora_Inf.value = nuevo.hora_Inf
    cant_PacAt.value = nuevo.cant_PacAt
    cant_PacAlta.value = nuevo.cant_PacAlta
    cant_PacAdm.value = nuevo.cant_PacAdm
    cant_TotalPac.value = nuevo.cant_TotalPac
    num_Turno.value = nuevo.num_Turno
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, { immediate: true })

function limpiarFormulario() {
  num_Inf.value = ''
  cod_Unidad.value = 0
  fecha_Inf.value = ''
  hora_Inf.value = ''
  cant_PacAt.value = 0
  cant_PacAlta.value = 0
  cant_PacAdm.value = 0
  cant_TotalPac.value = 0
  num_Turno.value = 0
}

async function handleSubmit() {
  // Validaciones básicas
  if (!num_Inf.value || !cod_Unidad.value || !fecha_Inf.value || !hora_Inf.value) {
    alert('Completa los campos obligatorios')
    return
  }

  const datos = {
    num_Inf: num_Inf.value,
    cod_Unidad: cod_Unidad.value,
    fecha_Inf: fecha_Inf.value,
    hora_Inf: hora_Inf.value,
    cant_PacAt: cant_PacAt.value,
    cant_PacAlta: cant_PacAlta.value,
    cant_PacAdm: cant_PacAdm.value,
    cant_TotalPac: cant_TotalPac.value,
    num_Turno: num_Turno.value
  }

  try {
    if (isEdit.value) {
      await updateInforme(datos.num_Inf, datos)
    } else {
      await createInforme(datos)
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
      <v-card-title>{{ isEdit ? 'Editar Informe' : 'Nuevo Informe' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Número de Informe" v-model.number="num_Inf" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código de Unidad" v-model.number="cod_Unidad" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Fecha" type="date" v-model="fecha_Inf" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Hora" v-model="hora_Inf" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes Atendidos" type="number" v-model.number="cant_PacAt" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes Dados de Alta" type="number" v-model.number="cant_PacAlta" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes Admitidos" type="number" v-model.number="cant_PacAdm" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Total de Pacientes" type="number" v-model.number="cant_TotalPac" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Número de Turno" v-model.number="num_Turno" />
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
      <v-card-title>{{ isEdit ? 'Informe actualizado' : 'Informe creado' }} con éxito</v-card-title>
      <v-card-actions class="d-flex justify-center mt-4">
        <v-btn color="success" @click="creationDialog = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
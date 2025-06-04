<!-- components/modals/InformeDialog.vue -->
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createInforme } from '@/functions'

const props = defineProps({
  modelValue: Boolean,
  unidad: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

// Campos del formulario
const form = ref({
  numInf: '',
  codUnidad: '',
  cantPacientesAtendidos: 0,
  cantPacientesAlta: 0,
  cantPacAdm: 0,
  cantTotalPacientes: 0,
  numTurno: 1,
  horaInf: new Date().toISOString().slice(0, 10),
  fechaInf: new Date().toISOString().slice(0, 10),
  codHosp: '',
  codDpto: ''
})

const isEdit = ref(false)

// Cargar datos si viene una unidad
watch(() => props.unidad, (nuevo) => {
  if (nuevo) {
    form.value.codUnidad = nuevo.cod_Unidad
    form.value.codHosp = nuevo.cod_Hptal
    form.value.codDpto = nuevo.cod_Dpto
  }
}, { immediate: true })

// Manejo de submit
async function handleSubmit() {
  try {
    await createInforme(form.value)
    emit('submit')
    emit('update:modelValue', false)
    emit('success') // Opcional: notificar éxito
  } catch (err) {
    alert(`❌ Error al guardar el informe: ${err.message}`)
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
      <v-card-title>Generar Informe</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field label="Número del Informe" v-model.number="form.numInf" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código de Unidad" v-model.number="form.codUnidad" disabled />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes Atendidos" v-model.number="form.cantPacientesAtendidos" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes dados de Alta" v-model.number="form.cantPacientesAlta" required/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Pacientes Admitidos" v-model.number="form.cantPacAdm" required/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Total de Pacientes" v-model.number="form.cantTotalPacientes" required/>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Turno" v-model.number="form.numTurno" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Hora del Informe" v-model="form.horaInf" type="time" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Fecha del Informe" v-model="form.fechaInf" type="date" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Hospital" v-model.number="form.codHosp" disabled />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Código Departamento" v-model.number="form.codDpto" disabled />
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
</template>
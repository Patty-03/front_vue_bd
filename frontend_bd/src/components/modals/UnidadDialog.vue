<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'
import {createUnidad, updateUnidad} from '@/functions.js'

const props = defineProps({
  modelValue: Boolean, // Para el v-model
  unidad: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'submit', 'success'])

const cod_Unidad = ref('')
const nombre_Unidad = ref('')
const ubicacion_Hptal = ref('')
const cod_Dpto = ref('')
const cod_Hptal = ref('')


const isEdit = ref(false)
// Cargar datos si estamos editando
watch(() => props.unidad, (nuevo) => {
  if (nuevo) {
    cod_Unidad.value = nuevo.cod_Unidad
    nombre_Unidad.value = nuevo.nombre_Unidad
    ubicacion_Hptal.value = nuevo.ubicacion_Hptal
    cod_Dpto.value = nuevo.cod_Dpto
    cod_Hptal.value = nuevo.cod_Hptal
    isEdit.value = true
  } else {
    limpiarFormulario()
    isEdit.value = false
  }
}, {immediate: true})


function limpiarFormulario() {
  cod_Unidad.value = ''
  nombre_Unidad.value = ''
  ubicacion_Hptal.value = ''
  cod_Dpto.value = ''
  cod_Hptal.value = ''

}

async function handleSubmit() {
  // Validaciones básicas
  if (!cod_Unidad.value || !nombre_Unidad.value.trim() || !cod_Dpto.value
      || !cod_Hptal.value) {
    alert('Completa todos los campos obligatorios')
    return
  }

  const datos = {
    cod_Unidad: parseInt(cod_Unidad.value),
    nombre_Unidad: nombre_Unidad.value.trim(),
    ubicacion_Hptal: ubicacion_Hptal.value.trim(),
    cod_Dpto: parseInt(cod_Dpto.value),
    cod_Hptal: parseInt(cod_Hptal.value)
  }
  try {
    if (isEdit.value) {
      await updateUnidad(datos)
    } else {
      await createUnidad(datos)

    }

   emit('submit', datos)
    emit('update:modelValue', false) // Cerrar el diálogo
  } catch (err) {
    console.error(err)
    alert(`❌ Error: ${err.message}`)
  }
}

</script>

<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      max-width="600"
      persistent
  >
    <v-card>
      <v-card-title>{{ isEdit ? 'Editar Unidad' : 'Nueva Unidad' }}</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="Código de Unidad"
                  v-model.number="cod_Unidad"
                  required
                  :disabled="isEdit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="Nombre de Unidad"
                  v-model="nombre_Unidad"
                  required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="Ubicación en el hospital"
                  v-model="ubicacion_Hptal"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="Código Departamento"
                  v-model.number="cod_Dpto"
                  required :disabled="isEdit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="Código Hospital"
                  v-model.number="cod_Hptal"
                  required :disabled="isEdit"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="emit('update:modelValue', false)">Cancelar</v-btn>
        <v-btn color="success" @click="handleSubmit">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
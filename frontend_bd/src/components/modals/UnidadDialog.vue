<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { createUnidad, updateUnidad } from '@/functions.js'

const props = defineProps({
  modelValue: Boolean, // Para el v-model
  unidad: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

// Campos reactivos
const form = ref({
  cod_Unidad: '',
  nombre_Unidad: '',
  ubic_Hptal: '',
  cod_Dpto: 0,
  cod_Hosp: 0
})

const isEdit = ref(false)

// Cargar datos si estamos editando
watch(() => props.unidad, (nuevo) => {
  if (nuevo) {
    isEdit.value = true
    form.value = { ...nuevo }
  } else {
    isEdit.value = false
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  form.value = {
    cod_Unidad: '',
    nombre_Unidad: '',
    ubic_Hptal: '',
    cod_Dpto: 0,
    cod_Hosp: 0
  }
}

async function handleSubmit() {
  try {
    const formData = new URLSearchParams()
    Object.entries(form.value).forEach(([key, value]) => {
      formData.append(key, value)
    })

    if (isEdit.value) {
      await updateUnidad(formData)
    } else {
      await createUnidad(formData)
    }

    emit('success') // Emitir evento de éxito
    emit('update:modelValue', false) // Cerrar el diálogo
  } catch (err) {
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
                v-model.number="form.cod_Unidad" 
                required 
                :disabled="isEdit"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                label="Nombre de Unidad" 
                v-model="form.nombre_Unidad" 
                required 
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                label="Ubicación en el hospital" 
                v-model="form.ubic_Hptal" 
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                label="Código Departamento" 
                v-model.number="form.cod_Dpto" 
                required 
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field 
                label="Código Hospital" 
                v-model.number="form.cod_Hosp" 
                required 
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
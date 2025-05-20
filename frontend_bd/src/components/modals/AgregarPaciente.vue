<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="500"
    transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>
        Ingrese los datos del paciente
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-container class="d-flex flex-row ">
            <h3 width="100%" class="text-no-wrap">Datos del hospital</h3>
            <v-container grid-list-xs>
              <v-select :items="items" v-model="value" label="Hospital"></v-select>
              <v-select :items="items" v-model="value" label="Departamento"></v-select>
              <v-select :items="items" v-model="value" label="Unidad"></v-select>
            </v-container>
          </v-container>

          <v-container class="d-flex flex-row ">
            <h3 width="100%" class="text-no-wrap">Datos del hospital</h3>
            <v-text-field label="No. Historia Clínica"></v-text-field>
            <v-text-field label="Nombre Completo"></v-text-field>
            <v-text-field label="Fecha de Nacimiento" type="date"></v-text-field>
            <v-text-field label="Dirección de residencia"></v-text-field>
          </v-container>

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>´
        <v-btn color="success" variant="elevated">Aceptar</v-btn>
        <v-btn color="error" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue']);

const items = ref(["Unidad 1", "Unidad 2"])

</script>
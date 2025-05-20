<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="500"
    transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>
        Ingrese los datos del hospital
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field label="Codigo del Hospital"></v-text-field>
          <v-text-field label="Nombre del Hospital"></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="success">Aceptar</v-btn>
        <v-btn color="error" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>
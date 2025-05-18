<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="500"
        transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Ingrese los datos del medico
            </v-card-title>

            <v-card-text>
                <v-form>
                    <v-text-field label="Codigo del medico"></v-text-field>
                    <v-text-field label="Nombre Completo"></v-text-field>
                    <v-text-field label="Especialidad"></v-text-field>
                    <v-text-field label="Numero de licencia"></v-text-field>
                    <v-text-field label="Telefono"></v-text-field>
                    <v-text-field label="Años de Experiencia" type="number" min="0" max="50"></v-text-field>
                    <v-text-field label="Datos adicionales de contacto"></v-text-field>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="$emit('update:modelValue', false)">Cancelar</v-btn>
                <v-btn color="success">Aceptar</v-btn>
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
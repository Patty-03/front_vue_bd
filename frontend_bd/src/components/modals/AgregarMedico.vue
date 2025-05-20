<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="100vw"
        transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Ingrese los datos del medico
            </v-card-title>

            <v-card-text>
                <v-form class="d-flex flex-row justify-space-around">
                    <v-container class="d-flex flex-row ">
                        <h3 width="100%" class="text-no-wrap">Datos del hospital</h3>
                        <v-container grid-list-xs>
                            <v-select :items="items" v-model="value" label="Hospital"></v-select>
                            <v-select :items="items" v-model="value" label="Departamento"></v-select>
                            <v-select :items="items" v-model="value" label="Unidad"></v-select>
                        </v-container>

                    </v-container>

                    <v-container class="d-flex flex-row">
                        <h3 width="100%" class="text-no-wrap">Datos profesionales</h3>
                        <v-container grid-list-xs>
                            <v-text-field label="Codigo del medico"></v-text-field>
                            <v-text-field label="Numero de licencia"></v-text-field>
                            <v-text-field label="Años de Experiencia" type="number" min="0" max="50"></v-text-field>
                        </v-container>
                    </v-container>


                    <v-container class="d-flex flex-row">
                        <h3 width="100%" class="text-no-wrap">Datos personales</h3>
                        <v-container grid-list-xs>
                            <v-text-field label="Nombre Completo"></v-text-field>
                            <v-text-field label="Especialidad"></v-text-field>
                            <v-text-field label="Telefono"></v-text-field>
                            <v-text-field label="Datos adicionales de contacto"></v-text-field>
                        </v-container>
                    </v-container>

                </v-form>
            </v-card-text>

            <v-card-actions>
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
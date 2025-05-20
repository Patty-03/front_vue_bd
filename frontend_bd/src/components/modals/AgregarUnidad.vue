<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="500"
        transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                Ingrese los datos de la unidad
            </v-card-title>

            <v-card-text>
                <v-form>
                    <v-container class="d-flex flex-row ">
                        <h3 width="100%" class="text-no-wrap">Datos generales</h3>
                        <v-container grid-list-xs>
                            <v-select :items="items" v-model="value" label="Hospital"></v-select>
                            <v-select :items="items" v-model="value" label="Departamento"></v-select>
                        </v-container>
                    </v-container>

                    <v-container class="d-flex flex-row ">
                        <v-text-field name="name" label="Nombre de la Unidad" id="id"></v-text-field>
                        <v-text-field name="name" label="Codigo de la Unidad" id="id"></v-text-field>
                    </v-container>
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
const items = ref(["Unidad 1", "Unidad 2"])
</script>
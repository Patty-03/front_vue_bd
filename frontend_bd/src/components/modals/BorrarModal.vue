<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="400px"
        transition="dialog-transition">
        <v-card class="d-flex flex-column pa-5 justify-center align-center">
            <v-icon icon="mdi-account-circle" size="xxx-large"></v-icon>
            <div class="d-flex flex-row align-center justify-space-around ma-4">
                <p>¿Está seguro de que desea borrar este elemento?</p>
            </div>


            <v-card-actions>
                <v-btn color="error" variant="elevated">Borrar</v-btn>
                <v-btn @click="$emit('update:modelValue', false)">Cancelar</v-btn>
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
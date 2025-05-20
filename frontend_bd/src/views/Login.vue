<template>
    <v-app>
        <v-dialog v-model="dialog" persistent transition="slide-y-transition" max-width="600">
            <v-card class="pa-6">
                <v-card-title primary-title class="d-flex align-center justify-center flex-column">
                    <h3 class="text-uppercase mb-3">Inicia sesión o Registrate</h3>
                    <v-icon icon="mdi-hospital-box"></v-icon>
                </v-card-title>

                <v-form class="mb-10 mt-8">
                    <v-text-field name="name" label="Nombre" id="id"></v-text-field>
                    <v-text-field name="name" label="Contraseña" id="id" type="password"></v-text-field>
                </v-form>

                <v-card-actions>
                    <v-btn color="success" variant="elevated" @click="router.push('/dashboard')">Iniciar sesion</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn variant="text">Aun no tienes una cuenta? Registrate</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-app>
</template>

<script setup>
    import router from '@/router';
import { ref } from 'vue';
    const dialog = ref(true)
</script>
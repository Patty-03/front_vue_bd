<template>
    <v-app id="bg">
            <v-card class="mt-16 pa-5">
                <v-card-title primary-title class="d-flex align-center justify-center flex-column">
                    <h3 class="text-uppercase mb-3">Inicia sesión o Registrate</h3>
                    <v-icon icon="mdi-hospital-box"></v-icon>
                </v-card-title>

                <v-form class="mb-10 mt-8">
                    <v-text-field
                        name="name"
                        label="Nombre"
                        id="id"
                    ></v-text-field>
                    <v-text-field
                        name="name"
                        label="Contraseña"
                        id="id"
                        type="password"
                    ></v-text-field>
                </v-form>

                <v-card-actions>
                    <v-btn color="success" variant="elevated">Iniciar sesion</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn variant="text">Aun no tienes una cuenta? Registrate</v-btn>
                </v-card-actions>
            </v-card>
    </v-app>
</template>

<style scoped>

</style>
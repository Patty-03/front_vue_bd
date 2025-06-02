<template>
  <v-container class="d-flex flex-column justify-center align-center pa-6">
    <h1 class="text-h4 mb-2 text-center">Sistema de Gestión Hospitalaria</h1>
    <p class="text-subtitle-1 text-center text-grey-darken-1">
      Bienvenido al panel de control. Seleccione una opción desde el menú superior o alguno de los reportes.
    </p>
  </v-container>

  <!-- Tarjetas con botones -->
  <v-container width="80vw" class="pa-4">
    <v-row no-gutters justify="center" dense>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="(reporte, index) in reportes" :key="index">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :color="isHovering ? 'success-lighten-5' : ''"
            class="ma-3 pa-4 elevation-6 rounded-lg transition-swing"
            :to="reporte.ruta"
            height="200"
          >
            <v-card-title class="text-h6 text-success d-flex align-center text-wrap">
              <v-icon :icon="reporte.icono" class="mr-3" />
              {{ reporte.nombre }}
            </v-card-title>
            <v-card-text class="text-body-2 mt-2">
              {{ reporte.descripcion }}
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const reportes = ref([
  {
    nombre: 'Resumen por Hospitales',
    descripcion: 'Muestra cantidad de unidades, médicos y pacientes por hospital.',
    ruta: '/reportes/resumenHospitales',
    icono: 'mdi-hospital-building'
  },
  {
    nombre: 'Hospitales con más pacientes',
    descripcion: 'Listado de hospitales con más de 100 pacientes registrados.',
    ruta: '/reportes/hospitalesMasPacientes',
    icono: 'mdi-account-group'
  },
  {
    nombre: 'Informes durante consultas',
    descripcion: 'Detalles del informe actualizado sobre pacientes atendidos y estado de unidad.',
    ruta: '/reportes/informesDuranteConsultas',
    icono: 'mdi-clipboard-text'
  },
  {
    nombre: 'Pacientes no atendidos',
    descripcion: 'Listado de pacientes que no fueron atendidos en un turno específico.',
    ruta: '/reportes/pacientesNoAtendidos',
    icono: 'mdi-account-cancel'
  },
  {
    nombre: 'Unidades en revisión',
    descripcion: 'Unidades donde el turno no alcanzó el 80% de éxito.',
    ruta: '/reportes/unidadesRevisarTurnos',
    icono: 'mdi-alert-circle'
  },
  {
    nombre: 'Consultas exitosas',
    descripcion: 'Resumen de unidades donde los turnos superaron el 80% de éxito.',
    ruta: '/reportes/consultasExitosas',
    icono: 'mdi-check-bold'
  },
    {
    nombre: 'Pacientes por Unidad',
    descripcion: 'Resumen de pacientes ordenados por unidad, departamento u hospital.',
    ruta: '/reportes/pacientesPorUnidad',
    icono: 'mdi-account-circle'
  }
])
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}
</style>
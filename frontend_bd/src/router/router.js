import { createRouter, createWebHistory } from 'vue-router'
import ListadoPacientes from '@/components/tables/ListadoPacientes.vue'
import Home from '@/views/Home.vue'
import ListadoMedicos from '@/components/tables/ListadoMedicos.vue'
import ListadoHospitales from '@/components/tables/ListadoHospitales.vue'
import ListadoUnidades from '@/components/tables/ListadoUnidades.vue'
import ListadoDepartamentos from '@/components/tables/ListadoDepartamentos.vue'
import ListadoInformes from '@/components/tables/ListadoInformes.vue'
import ListadoRegistros from '@/components/tables/ListadoRegistros.vue'
import ListadoTurnos from '@/components/tables/ListadoTurnos.vue'
import ConsultasExitosas from '@/components/tables/ConsultasExitosas.vue'
import ResumenHospitales from '@/components/tables/ResumenHospitales.vue'
import HospitalesMasPacientes from '@/components/tables/HospitalesMasPacientes.vue'
import UnidadesRevision from '@/components/tables/UnidadesRevision.vue'
import PacientesNoAtendidos from '@/components/tables/PacientesNoAtendidos.vue'
import PacientesPorUnidad from '@/components/tables/PacientesPorUnidad.vue'
import InformeConsultas from '@/components/tables/InformeConsultas.vue'
import ResumenProceso from '@/components/tables/ResumenProceso.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pacientes', component: ListadoPacientes },
  { path: '/medicos', component: ListadoMedicos },
  { path: '/unidades', component: ListadoUnidades },
  { path: '/hospitales', component: ListadoHospitales },
  { path: '/departamentos', component: ListadoDepartamentos },
  { path: '/informes', component: ListadoInformes },
  { path: '/registros', component: ListadoRegistros },
  { path: '/turnos', component: ListadoTurnos },
  { path: '/reportes/consultasExitosas', component: ConsultasExitosas },
  { path: '/reportes/resumenHospitales', component: ResumenHospitales },
  { path: '/reportes/unidadesRevisarTurnos', component: UnidadesRevision },
  { path: '/reportes/pacientesNoAtendidos', component: PacientesNoAtendidos },
  { path: '/reportes/pacientesPorUnidad', component: PacientesPorUnidad },
  { path: '/reportes/informesDuranteConsultas', component: InformeConsultas },
  { path: '/reportes/hospitalesMasPacientes', component: HospitalesMasPacientes },
  { path: '/reportes/resumenProceso', component: ResumenProceso },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

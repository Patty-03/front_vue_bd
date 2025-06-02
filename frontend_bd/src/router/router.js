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
  /*{ path: '/reportes/resumenProceso', component: ConsultaressExitosas },
  { path: '/reportes/consultasExitosas', component: ConsultasExitosas },
  { path: '/reportes/consultasExitosas', component: ConsultasExitosas },
  { path: '/reportes/consultasExitosas', component: ConsultasExitosas },
  { path: '/reportes/consultasExitosas', component: ConsultasExitosas },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

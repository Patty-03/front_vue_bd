<script setup>
import router from '@/router/router';
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

function logout() {
  if (confirm('Esta seguro que desea cerrar sesion?')){
    localStorage.removeItem('isLoggedIn')
    alert('Sesion cerrada satisfactoriamente')
    router.push('/')
  }
}

</script>

<template>
  <v-app-bar color="primary" app>
    <v-app-bar-nav-icon class="d-flex align-center">
      <v-btn icon @click="logout"><v-icon title="Cerrar sesion">mdi-hospital-box</v-icon></v-btn>
    </v-app-bar-nav-icon>

    <v-toolbar-title>Gestión Hospitalaria</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tabs v-if="!mobile" align-with-title>
      <v-tab v-for="(item, index) in menuItems" :key="index" :to="item.route">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-menu v-else>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index" :to="item.route">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      { title: 'Inicio', icon: 'mdi-home', route: '/' },
      { title: 'Pacientes', icon: 'mdi-account-box', route: '/pacientes' },
      { title: 'Médicos', icon: 'mdi-doctor', route: '/medicos' },
      { title: 'Unidades', icon: 'mdi-city', route: '/unidades' },
      { title: 'Hospitales', icon: 'mdi-hospital-building', route: '/hospitales' },
      { title: 'Departamentos', icon: 'mdi-domain', route: '/departamentos' },
      { title: 'Informes', icon: 'mdi-clipboard-text', route: '/informes' },
      { title: 'Registros', icon: 'mdi-book', route: '/registros' },
      { title: 'Turnos', icon: 'mdi-calendar-clock', route: '/turnos' },
    ],
  }),
}
</script>

<style scoped>
.v-tab--active {
  background-color: rgba(255, 255, 255, 0.2);
}

.v-app-bar-nav-icon {
  margin-right: 12px;
}
</style>

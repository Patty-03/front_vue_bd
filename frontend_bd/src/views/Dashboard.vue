<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDisplay } from 'vuetify'
import ListadoPacientes from '../components/ListadoPacientes.vue'
import ListadoMedicos from '@/components/ListadoMedicos.vue'
import ResumenHospitales from '@/components/ResumenHospitales.vue'
import InformesConsultas from '@/components/InformesConsultas.vue'
import UserDialog from '@/components/modals/UserDialog.vue'

const { mobile } = useDisplay()
const drawer = ref(true)
const rail = ref(false)
const openUserDialog = ref(false)

const isMobile = ref(mobile.value)

function updateMobile() {
  isMobile.value = mobile.value
  if (isMobile.value) {
    drawer.value = false 
    rail.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', updateMobile)
  updateMobile()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMobile)
})

const menuItems = ref([
  { title: 'Listado de Pacientes', icon: 'mdi-account-group', component: ListadoPacientes },
  { title: 'Listado de Médicos', icon: 'mdi-doctor', component: ListadoMedicos },
  { title: 'Resumen por Hospitales', icon: 'mdi-hospital', component: ResumenHospitales },
  { title: 'Informes de Consultas', icon: 'mdi-clipboard-text', component: InformesConsultas },
])

const currentView = ref(ListadoPacientes)

const currentViewTitle = computed(() => {
  return menuItems.value.find(item => item.component === currentView.value)?.title || 'Dashboard'
})
</script>

<template>
  <v-app>
    <!-- App Bar (se mantiene igual) -->
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!isMobile"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ currentViewTitle }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-account-circle" @click="openUserDialog = true"></v-btn>
    </v-app-bar>

    <!-- Navigation Drawer para desktop -->
    <v-navigation-drawer
      v-if="!isMobile"
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
      class="desktop-sidebar"
    >
      <v-list-item prepend-icon="mdi-hospital-building" title="Gestión Hospitalaria" nav>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item 
          v-for="item in menuItems" 
          :key="item.title" 
          :prepend-icon="item.icon" 
          :title="item.title" 
          :value="item.value"
          @click="currentView = item.component"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content -->
    <v-main>
      <v-container fluid class="mt-8">
        <component :is="currentView" />
      </v-container>
    </v-main>
    
    <UserDialog v-model="openUserDialog"></UserDialog>
    <!-- Bottom Navigation para móvil -->
    <v-bottom-navigation
      v-if="isMobile"
      v-model="currentView"
      grow
      class="mobile-nav"
    >
      <v-btn
        v-for="item in menuItems"
        :key="item.title"
        :value="item.component"
      >
        <v-icon :icon="item.icon"></v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 56px; 
}

.desktop-sidebar {
  transition: all 0.3s ease;
}

.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

/* Ajustes para los botones en móvil */
.mobile-nav .v-btn {
  min-width: auto;
  flex-direction: column;
  height: auto;
  padding: 8px 0;
}

.mobile-nav .v-btn span {
  font-size: 0.75rem;
  margin-top: 4px;
}

.mobile-nav .v-btn .v-icon {
  margin-bottom: 2px;
}
</style>
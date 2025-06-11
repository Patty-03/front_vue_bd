<script setup>
import Header from '@/components/Header.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <v-app class="page-layout">
    <Header v-if="route.path !== '/'" />

    <!-- Contenido principal -->
    <v-main :class="{ 'has-header': route.path !== '/' }">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.v-main.has-header {
  padding-top: 64px; 
}

.v-main.has-header .v-container {
  max-width: 96vw;
}
</style>
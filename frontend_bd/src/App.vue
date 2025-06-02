<script setup>
import Header from '@/components/Header.vue'
</script>

<template>
  <v-app class="page-layout">
    <Header />
    
    <v-main>
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

/* Ajuste para el contenido debajo del header */
.v-main {
  padding-top: 64px; /* Altura del app-bar */
  min-height: calc(100vh - 64px);
}
</style>
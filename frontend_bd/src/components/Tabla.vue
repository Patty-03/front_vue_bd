<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon v-if="icon" :icon="icon" class="mr-2"></v-icon>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
        density="compact"
      ></v-text-field>
    </v-card-title>

    <!-- Tabla principal -->
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="itemsPerPage"
      :loading="loading"
      :sort-by="sortBy"
    >
      <!-- Slot para acciones personalizadas -->
      <template v-slot:item.actions="{ item }" v-if="showActions">
        <v-icon
          small
          class="mr-2"
          @click="$emit('edit', item)"
          v-if="showEdit"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="$emit('delete', item)"
          v-if="showDelete"
        >
          mdi-delete
        </v-icon>
        <slot name="actions" :item="item"></slot>
      </template>

      <!-- Slot para contenido personalizado en celdas -->
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
    </v-data-table>

    <!-- Diálogo de confirmación para eliminar -->
    <v-dialog v-model="confirmDelete" max-width="400" v-if="showDelete">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Está seguro que desea eliminar este registro?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="confirmDelete = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDeleteAction">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Tabla de datos'
  },
  icon: {
    type: String,
    default: ''
  },
  headers: {
    type: Array,
    required: true,
    default: () => []
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  itemsPerPage: {
    type: Number,
    default: 10
  },
  loading: {
    type: Boolean,
    default: false
  },
  sortBy: {
    type: Array,
    default: () => []
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showEdit: {
    type: Boolean,
    default: true
  },
  showDelete: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['edit', 'delete', 'confirm-delete'])

const search = ref('')
const confirmDelete = ref(false)
const itemToDelete = ref(null)

function openDeleteDialog(item) {
  itemToDelete.value = item
  confirmDelete.value = true
}

function confirmDeleteAction() {
  emit('confirm-delete', itemToDelete.value)
  confirmDelete.value = false
  itemToDelete.value = null
}
</script>

<style scoped>
.v-data-table {
  margin-top: 16px;
}
</style>
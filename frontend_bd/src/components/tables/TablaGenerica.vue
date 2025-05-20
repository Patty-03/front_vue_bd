<template>
    <v-data-table headers="headers" items="items" hide-actions class="elevation-1" select-all item-key="id"
        loading="false" search="search">

    </v-data-table>
</template>

<script setup>
import { ref } from 'vue';

const headers = ref("")
const items = ref("")
</script>
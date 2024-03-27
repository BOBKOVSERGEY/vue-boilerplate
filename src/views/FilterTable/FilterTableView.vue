<script setup>
import { onMounted, ref } from "vue";

import DataTable from "@/components/FilterTable/DataTable.vue";

/*
  Data
 */
const items = ref([]);

/*
  Hooks
 */
onMounted(async () => {
  const response = await fetch('http://localhost/api/v1/tasks');
  const data =  await response.json();
  items.value = data?.data

})

</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-4xl mb-5 text-center">Filter Table Vue</h1>
    <DataTable :items="items"/>
  </div>
</template>
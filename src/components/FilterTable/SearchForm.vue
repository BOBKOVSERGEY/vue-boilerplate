<script setup>

  const emit = defineEmits(['search'])
  const search = (e) => {
    emit('search', e.target.value)
  }

</script>

<template>
  <form class="py-3 px-4 flex items-center">
    <label class="sr-only">Search</label>
    <div class="relative w-full">
      <input
          @input="search"
          type="text" placeholder="Search"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
    </div>
  </form>
</template>
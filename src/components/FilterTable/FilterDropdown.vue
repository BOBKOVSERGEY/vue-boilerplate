<script setup>
import {computed, ref} from "vue";

  const show = ref(false);
  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  });

  const emit = defineEmits(['filter']);

  const statuses = computed(() => {
    return [...new Set(props.items.map(item => item.status))];
  });

  const filter = (e) => {
    emit('filter', e.target.value)
  }
</script>

<template>
  <div class="relative flex items-center w-full px-4">
    <button
        @click="show = !show"
        class="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900">
      Filter
    </button>
    <div v-if="show" class="absolute top-12 right-0 z-10 w-48 p-3 bg-white rounded-lg shadow">
      <h6 class="mb-3 text-sm font-medium text-gray-900">
        Status
      </h6>
      <ul class="space-y-2 text-sm">
        <li v-for="(status, index) in statuses">
          <input
              @change="filter"
              :id="`filter_option_${index}`"
              type="checkbox" :value="status" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500">
          <label :for="`filter_option_${index}`" class="ms-2 text-sm font-medium text-gray-900">
            {{ status }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
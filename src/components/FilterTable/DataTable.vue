<script setup>
  import {computed, ref} from "vue";
  import SearchForm from "@/components/FilterTable/SearchForm.vue";
  import FilterRadios from "@/components/FilterTable/FilterRadios.vue";
  import FilterDropdown from "@/components/FilterTable/FilterDropdown.vue";

  const props = defineProps({
    items: {
      type: Array,
      required: true
    }
  });

  const searchFilter = ref('');
  const radioFilter = ref('');
  const statusesFilter = ref([]);

  const filteredItems = computed(() => {

    let items = props.items;

    switch (radioFilter.value) {
      case 'today':
        items = items.filter(item => new Date(item.created_at).getDate() === new Date().getDate() )
        break;
      case 'past':
        items = items.filter(item => new Date(item.created_at) < new Date())
        break;
    }

    if (statusesFilter.value.length) {
      items = items.filter(item => statusesFilter.value.includes(item.status))
    }

    if(searchFilter.value !== '') {
      items =  items.filter(item =>
          item.name
              .toLowerCase()
              .includes(searchFilter.value.trim().toLowerCase()) ||
          item.user.toLowerCase().includes(searchFilter.value.trim().toLowerCase())
      )
    }

    return items;
  });

  const handleSearch = (query) => {
    searchFilter.value = query;
  }

  const handleFilter = (filter) => {
    radioFilter.value = filter
  }

  const handleCheckboxFilter = (filter) => {
    if (statusesFilter.value.includes(filter)) {
      return statusesFilter.value.splice(statusesFilter.value.indexOf(filter), 1)
    }
    return statusesFilter.value.push(filter)
  }
</script>

<template>
  <div class="bg-white relative border rounded-lg">
    <div class="flex items-center justify-between">
      <SearchForm @search="handleSearch"/>
      <div class="flex items-center justify-end text-sm font-semibold mr-4">
        <FilterRadios @filter="handleFilter" />
        <FilterDropdown :items="items" @filter="handleCheckboxFilter" />
      </div>
    </div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="px-4 py-3">ID</th>
          <th class="px-4 py-3">Assigned To</th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3">Title</th>
          <th class="px-4 py-3">Due At</th>
          <th class="px-4 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in filteredItems" :key="item.id" class="border-b">
        <td class="px-4 py-3 font-medium text-gray-900">
          {{ item.id }}
        </td>
        <td class="px-4 py-3 font-medium text-gray-900">
          {{ item.user }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.status }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.name }}
        </td>
        <td class="px-4 py-3 ">
          {{ item.created_at }}
        </td>
        <td class="px-4 py-3 ">
          <a href="#" class="text-indigo-500 hover:underline">Details</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<template>
  <ul class="data-list">
    <li v-for="item in paginatedItems" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePaginationStore } from '../stores/pagination'

const store = usePaginationStore()

const items = Array.from({ length: 100 }, (_, k) => ({ id: k + 1, name: `Item ${k + 1}` }))
store.setTotalItems(items.length)

const paginatedItems = computed(() => {
  const start = (store.currentPage - 1) * store.itemsPerPage
  const end = start + store.itemsPerPage
  return items.slice(start, end)
})
</script>

<style scoped>
.data-list {
  max-width: 800px;
  margin: 0 auto;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.data-list li {
  margin: 5px 0;
  padding: 10px;
  width: 50px;
  max-width: 400px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}
</style>

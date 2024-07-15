<template>
  <div class="pagination">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">&lt;</button>

    <button
        :class="{ active: currentPage === 1 }"
        @click="goToPage(1)"
    >1</button>
    <span v-if="shouldShowLeftEllipsis">...</span>

    <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>

    <span v-if="shouldShowRightEllipsis">...</span>

    <button
        v-if="totalPages > 1"
        @click="goToPage(totalPages)"
        :class="{ active: currentPage === totalPages }"
    >{{ totalPages }}</button>
    <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
    >&gt;</button>

    <div class="select-wrapper">
      <select v-model="itemsPerPage" @change="updateItemsPerPage">
        <option
            v-for="count in [5, 10, 20, 50, 100]"
            :key="count"
            :value="count"
        >{{ count }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePaginationStore } from '../stores/pagination'

const store = usePaginationStore()

const currentPage = computed(() => store.currentPage)
const totalPages = computed(() => store.totalPages)
const itemsPerPage = computed(() => store.itemsPerPage)

const goToPage = (page: number) => {
  if (page > 0 && page <= store.totalPages) {
    store.setPage(page)
  }
}

const updateItemsPerPage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  store.setItemsPerPage(Number(target.value))
  if (currentPage.value > totalPages.value) {
    store.setPage(totalPages.value)
  }
}

// Logic for displaying pages with ellipsis
const visiblePages = computed(() => {
  const pages = []
  if (totalPages.value <= 4) {
    for (let i = 2; i < totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    const startPage = Math.max(2, currentPage.value - 1)
    const endPage = Math.min(totalPages.value - 1, currentPage.value + 1)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }
  return pages
})

const shouldShowLeftEllipsis = computed(() => currentPage.value > 3)
const shouldShowRightEllipsis = computed(() => currentPage.value < totalPages.value - 2)
</script>

<style scoped>
.pagination {
  position: fixed;
  bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button, .pagination select {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover, .pagination select:hover {
  background-color: #f0f0f0;
}

.pagination button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.pagination button.active {
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
}

.select-wrapper {
  position: relative;
  display: inline-block;
}

.select-wrapper select {
  -webkit-appearance: none; /* Remove default arrow in Chrome/Safari */
  -moz-appearance: none; /* Remove default arrow in Firefox */
  appearance: none; /* Remove default arrow in others */
  padding-right: 40px; /* Add space for custom arrow */
}

.select-wrapper::after {
  content: '▼'; /* Unicode character for down arrow */
  font-size: 12px;
  color: #333;
  position: absolute;
  right: 10px; /* Adjust this value to move chevron */
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Make sure click events go to the select element */
}
</style>

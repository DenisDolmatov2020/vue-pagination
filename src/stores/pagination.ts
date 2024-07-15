import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('pagination', {
    state: () => ({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 10
    }),
    getters: {
        totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
    },
    actions: {
        setPage(page: number) {
            this.currentPage = page
        },
        setItemsPerPage(count: number) {
            this.itemsPerPage = count
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages
            }
        },
        setTotalItems(total: number) {
            this.totalItems = total
        }
    },
})

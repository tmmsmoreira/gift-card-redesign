<script setup lang="ts">
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Select"

// Define props
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10, // Default cards per page
  },
  availablePageSizes: {
    type: Array as () => number[], // Array of available page sizes
    default: () => [10, 20, 50],
  },
})

const { totalPages } = toRefs(props)

// Define emit to send events
const emit = defineEmits(['page-changed', 'page-size-changed'])

// Method to change the page
const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit('page-changed', page)
  }
}

// Method to change the number of cards per page
const changePageSize = (size: number) => {
  emit('page-size-changed', size)
}

watch(totalPages, () => {
  console.log(totalPages)
  if (props.currentPage > totalPages.value) {
    changePage(totalPages.value)
  }
})

// Computed function to calculate pagination behavior
const middlePages = computed(() => {
  const delta = 2 // Number of pages to show around the current page
  const range: number[] = []

  if (props.totalPages <= 1) return range // If totalPages <= 1, return an empty array

  let start = Math.max(2, props.currentPage - delta)
  let end = Math.min(props.totalPages - 1, props.currentPage + delta)

  if (start > 2) {
    start++
  }
  if (end < props.totalPages - 1) {
    end--
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})

const itemsPerPage = computed({
  get: () => props.pageSize,
  set: (value: number) => {
    changePageSize(value)
  },
})

// Ellipsis visibility computed
const showLeftEllipsis = computed(() => props.currentPage > 3 && props.totalPages > 1)
const showRightEllipsis = computed(() => props.currentPage < props.totalPages - 2 && props.totalPages > 1)
</script>

<template>
  <nav aria-label="Pagination" class="pagination-container">
    <ul class="pagination">
      <!-- Previous Button -->
      <li>
        <nord-button :disabled="currentPage === 1" @click.prevent="changePage(currentPage - 1)"
          :aria-disabled="currentPage === 1">
          Previous
        </nord-button>
      </li>

      <!-- First Page -->
      <li :class="['page-item', { active: currentPage === 1 }]">
        <nord-button :variant="currentPage === 1 ? 'primary' : undefined" @click.prevent="changePage(1)">
          1
        </nord-button>
      </li>

      <!-- Ellipsis before middle pages -->
      <li v-if="showLeftEllipsis" class="page-item ellipsis">...</li>

      <!-- Middle Page Numbers -->
      <li v-for="page in middlePages" :key="page" :class="['page-item', { active: currentPage === page }]">
        <nord-button :variant="currentPage === page ? 'primary' : undefined" @click.prevent="changePage(page)">
          {{ page }}
        </nord-button>
      </li>

      <!-- Ellipsis after middle pages -->
      <li v-if="showRightEllipsis" class="page-item ellipsis">...</li>

      <!-- Last Page -->
      <li v-if="totalPages > 1" :class="['page-item', { active: currentPage === totalPages }]">
        <nord-button :variant="currentPage === totalPages ? 'primary' : undefined"
          @click.prevent="changePage(totalPages)">
          {{ totalPages }}
        </nord-button>
      </li>

      <!-- Next Button -->
      <li>
        <nord-button :disabled="currentPage === totalPages" @click.prevent="changePage(currentPage + 1)"
          :aria-disabled="currentPage === totalPages">
          Next
        </nord-button>
      </li>
    </ul>

    <!-- Dropdown for selecting cards per page -->
    <div class="page-size-selector">
      <label for="pageSizeSelect">Items per page: </label>
      <nord-select id="pageSizeSelect" v-model="itemsPerPage" hide-label>
        <option v-for="size in availablePageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </nord-select>
    </div>
  </nav>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
}

.pagination {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
<script setup lang="ts">
import "@nordhealth/components/lib/Button"

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
});

// Define emit to send the page-changed event
const emit = defineEmits(['page-changed']);

// Method to change the page
const changePage = (page: number) => {
  if (page > 0 && page <= props.totalPages) {
    emit('page-changed', page);
  }
};

// Computed function to calculate pagination behavior
const middlePages = computed(() => {
  const delta = 2; // Number of pages to show around the current page
  const range = [];

  let start = Math.max(2, props.currentPage - delta);
  let end = Math.min(props.totalPages - 1, props.currentPage + delta);

  if (start > 2) {
    start++;
  }
  if (end < props.totalPages - 1) {
    end--;
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

// Ellipsis visibility computed
const showLeftEllipsis = computed(() => props.currentPage > 3);
const showRightEllipsis = computed(() => props.currentPage < props.totalPages - 2);
</script>

<template>
  <nav aria-label="Pagination" class="pagination-container">
    <ul class="pagination">
      <!-- Previous Button -->
      <li>
        <nord-button
          :disabled="currentPage === 1"
          @click.prevent="changePage(currentPage - 1)"
          :aria-disabled="currentPage === 1"
        >
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
      <li
        v-for="page in middlePages"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <nord-button :variant="currentPage === page ? 'primary' : undefined" @click.prevent="changePage(page)">
          {{ page }}
        </nord-button>
      </li>

      <!-- Ellipsis after middle pages -->
      <li v-if="showRightEllipsis" class="page-item ellipsis">...</li>

      <!-- Last Page -->
      <li :class="['page-item', { active: currentPage === totalPages }]">
        <nord-button :variant="currentPage === totalPages ? 'primary' : undefined" @click.prevent="changePage(totalPages)">
          {{ totalPages }}
        </nord-button>
      </li>

      <!-- Next Button -->
      <li>
        <nord-button
          :disabled="currentPage === totalPages"
          @click.prevent="changePage(currentPage + 1)"
          :aria-disabled="currentPage === totalPages"
        >
          Next
        </nord-button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.pagination {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 0.5rem;
}
</style>
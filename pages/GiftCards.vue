<script lang="ts" setup>
import "@nordhealth/components/lib/Header"
import "@nordhealth/components/lib/Badge"
import "@nordhealth/components/lib/VisuallyHidden"
import "@nordhealth/components/lib/Dropdown"
import "@nordhealth/components/lib/DropdownItem"
import "@nordhealth/components/lib/Header"
import "@nordhealth/components/lib/Button"
import "@nordhealth/components/lib/Icon"
import "@nordhealth/components/lib/Card"
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Table"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Modal"
import "@nordhealth/components/lib/ButtonGroup"

import GiftCardsModal from "../components/GiftCardsModal.vue"
import { EModalActions } from "../types"

import { useGiftCardsStore } from "../stores/giftCards"


const giftCardsStore = useGiftCardsStore()
const { list, loading, totalDocuments } = storeToRefs(giftCardsStore)

const currentPage = ref(1)
const itemsPerPage = ref(10)
const modalElement = ref<InstanceType<typeof GiftCardsModal>>()

const handlePageChange = (page: number) => {
  currentPage.value = page;
  giftCardsStore.listGiftCards(itemsPerPage.value, currentPage.value - 1)
  console.log('Current Page:', page);
};

const totalPages = computed(() => {
  return Math.ceil(totalDocuments.value / itemsPerPage.value)
})

onMounted(() => {
  giftCardsStore.listGiftCards(itemsPerPage.value)
})
</script>

<template>
  <nord-header slot="header">
    <h1 class="n-typescale-l">Gift Cards</h1>
    <nord-dropdown slot="end" size="s">
      <nord-button variant="primary" slot="toggle">
        <nord-icon slot="start" name="interface-add-small"></nord-icon>
        Create new
      </nord-button>
      <nord-dropdown-item @click="modalElement?.openModal(EModalActions.CREATE)">Service Gift Card</nord-dropdown-item>
      <nord-dropdown-item @click="modalElement?.openModal(EModalActions.CREATE)">Price Gift Card</nord-dropdown-item>
    </nord-dropdown>
  </nord-header>
  <nord-stack gap="l">
    <nord-card padding="none">
      <h2 slot="header">Available Gift Cards</h2>

      <div slot="header-end">
        <nord-input size="s" label="Search" hide-label placeholder="Search for the name or code on the gift card"
          type="search" style="--n-input-inline-size: 300px" />
      </div>

      <nord-table>
        <table>
          <thead>
            <tr>
              <th class="n-table-align-right">Name</th>
              <th>Issued Date</th>
              <th>Type Data</th>
              <th>Code</th>
              <th class="n-table-align-right">Status</th>
              <th class="n-table-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading" class="n-align-center">
              <td colspan="6">
                <nord-spinner size="xl"></nord-spinner>
              </td>
            </tr>
            <tr 
              v-else 
              v-for="giftCard in list"
              :key="giftCard.$id" 
            >
              <td class="n-table-align-right">{{ giftCard.name }}</td>
              <td>{{ giftCard.issueDate }}</td>
              <td>{{ giftCard.typeData }}</td>
              <td>{{ giftCard.code }}</td>
              <td class="n-table-align-right">
                <nord-badge :variant="giftCard.status ? 'success' : 'info'">
                  {{ giftCard.status ? 'Used' : 'Not Used' }}
                </nord-badge>
              </td>
              <td>
                <div class="n-table-actions">
                  <nord-dropdown slot="end" size="s">
                    <nord-button size="s" square slot="toggle">
                      <nord-visually-hidden>Actions</nord-visually-hidden>
                      <nord-icon name="interface-menu-small"></nord-icon>
                    </nord-button>
                    <nord-dropdown-item @click="modalElement?.openModal(EModalActions.VIEW, giftCard.$id)">View</nord-dropdown-item>
                    <nord-dropdown-item @click="modalElement?.openModal(EModalActions.UPDATE, giftCard.$id)">Edit</nord-dropdown-item>
                    <nord-dropdown-item>Delete</nord-dropdown-item>
                  </nord-dropdown>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </nord-table>

      <div v-if="!loading" slot="footer">
        <AppPagination :totalPages="totalPages" :currentPage="currentPage" @page-changed="handlePageChange" />
      </div>
    </nord-card>

    <!-- <nord-modal ref="deleteModalElement" size="s" aria-labelledby="title">
      <h2 slot="header" id="title">Delete gift card?</h2>
      <p class="n-reset">Are you sure you want to delete the '{{ list.name }}'' gift card?</p>
    
      <nord-button-group slot="footer" variant="spaced">
        <nord-button expand id="cancelButton">Cancel</nord-button>
        <nord-button expand id="confirmButton" variant="danger" autofocus>Delete</nord-button>
      </nord-button-group>
    </nord-modal> -->

    <GiftCardsModal ref="modalElement" />
  </nord-stack>
</template>

<style scoped>
</style>
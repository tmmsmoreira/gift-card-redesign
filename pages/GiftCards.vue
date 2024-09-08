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

import { useGiftCardsStore } from "../stores/giftCards"

const giftCardsStore = useGiftCardsStore()
const { list } = storeToRefs(giftCardsStore)

onMounted(() => {
  giftCardsStore.listGiftCards()
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
      <nord-dropdown-item>Service Gift Card</nord-dropdown-item>
      <nord-dropdown-item>Price Gift Card</nord-dropdown-item>
    </nord-dropdown>
  </nord-header>
  <nord-stack gap="l">
    <nord-card padding="none">
      <h2 slot="header">Your items</h2>

      <div slot="header-end">
        <nord-input 
          size="s" 
          label="Search" 
          hide-label
          placeholder="Search for the name or code on the gift card"
          type="search"
          style="--n-input-inline-size: 300px"
        />
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
            <tr v-for="giftCard in list" :key="giftCard.$id">
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
                    <nord-dropdown-item>Edit</nord-dropdown-item>
                    <nord-dropdown-item>Delete</nord-dropdown-item>
                  </nord-dropdown>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </nord-table> 
    </nord-card>
  </nord-stack>
</template>

<style type="text/css">

</style>
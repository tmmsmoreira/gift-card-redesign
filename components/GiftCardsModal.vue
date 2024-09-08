<script setup lang="ts">
import "@nordhealth/components/lib/Stack"
import "@nordhealth/components/lib/Spinner"
import "@nordhealth/components/lib/Input"
import "@nordhealth/components/lib/Modal"
import "@nordhealth/components/lib/ButtonGroup"
import type { Modal } from "@nordhealth/components";
import type { IGiftCard } from "../types"
import { EModalActions } from "../types"

import { useGiftCardsStore } from "../stores/giftCards"
import useField from "../composables/useField"

const modalAction = ref()
const loadingModalData = ref(false)
const modalElement = ref<InstanceType<typeof Modal>>()

const giftCardsStore = useGiftCardsStore()

const modalTitle = computed(() => {
  switch (modalAction.value) {
    case EModalActions.CREATE:
      return 'Create new Gift Card'
    case EModalActions.UPDATE:
      return 'Update Gift Card'
    case EModalActions.VIEW:
      return 'Gift Card Details'
    default:
      return 'Gift Card'
  }
})

const handleSubmit = () => {}

const name = useField()
const type = useField()
const code = useField()



const openModal = (action: EModalActions, id?: IGiftCard['$id']) => {
  loadingModalData.value = true
  modalAction.value = action
  modalElement.value?.showModal()

  if (id) {
    giftCardsStore.getGiftCard(id).then(giftCards => {
      console.log(giftCards)
      name.value = giftCards?.name || ''
      type.value = giftCards?.type || ''
      code.value = giftCards?.code || ''
    }).finally(() => {
      loadingModalData.value = false
    })
  }
}

defineExpose({ openModal })
</script>

<template>
  <nord-modal ref="modalElement" size="m" aria-labelledby="title">
    <h2 slot="header" id="title">{{ modalTitle }}</h2>
    <div v-if="loadingModalData" class="n-padding-m n-align-center">
      <nord-spinner  size="xl"></nord-spinner>
    </div>
    <form v-else action="#" @submit.prevent="handleSubmit">
      <nord-stack>
        <nord-input
          label="Name"
          name="name"
          v-model="name.value"
        />
        
        <nord-input
          label="Type"
          name="type"
          v-model="type.value"
        />

        <nord-input
          label="Code"
          name="code"
          disabled
          v-model="code.value"
        />
      </nord-stack>
    </form>

    <nord-button-group v-if="modalAction !== EModalActions.VIEW" slot="footer" variant="spaced">
      <nord-button expand id="confirmButton" variant="primary" autofocus>
        {{ modalAction === EModalActions.CREATE ? 'Create' : 'Save changes'  }}
      </nord-button>
    </nord-button-group>
  </nord-modal>
</template>

<style scoped>
/* Your component styles here */
</style>
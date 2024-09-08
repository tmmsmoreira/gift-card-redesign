import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import { ID, Query } from "appwrite"
import type { IGiftCard } from "../types"

import giftCardsList from "../consts/giftCards.json"

interface IGiftCardsStore {
  loading: boolean,
  list: IGiftCard[],
  totalDocuments: number
  selectedItem: IGiftCard | null
}

const config = useRuntimeConfig()
const { 
  APPWRITE_DATABASE_ID,
  APPWRITE_GIFT_CARD_COLLECTION_ID
} = config.public

const { databases } = useAppWrite()

export const useGiftCardsStore = defineStore('giftCards', {
  state: () => {
    return {
      loading: false,
      list: [],
      totalDocuments: 0,
      selectedItem: null
    } as IGiftCardsStore
  },
  actions: {
    async listGiftCards(limit: number, offset?: number) {
      this.loading = true

      if (!offset) offset = 0

      const promise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset)
        ]
      )
  
      await promise.then((response) => {
        this.list = response.documents as IGiftCard[]
        this.totalDocuments = response.total
        console.log(response.documents)
      }).catch((error) => {
        console.log(error)
        this.list = giftCardsList as IGiftCard[]
        this.totalDocuments = giftCardsList.length
      }).finally(() => {
        this.loading = false
      })
    },

    async createGiftCard(data: IGiftCard) {
      const promise = databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        ID.unique(),
        data
      )
  
      await promise.then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },

    getGiftCard(id: IGiftCard['$id']) {
      const promise = databases.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        id
      )
  
      return promise
    },

    async updateGiftCard(data: IGiftCard) {
      const promise = databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        data.$id,
        data
      )
  
      await promise.then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },

    async deleteGiftCard(id: IGiftCard['$id']) {
      const promise = databases.deleteDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        id,
      )
  
      await promise.then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
})
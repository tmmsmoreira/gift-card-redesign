import { defineStore } from 'pinia'
import useAppWrite from "../composables/useAppWrite"
import { ID } from "appwrite";
import type { Models } from "appwrite";

interface IGiftCard extends Models.Document {
  name: string,
  issueDate: Date,
  type: "price" | "service",
  typeData: string,
  code: string,
  status: boolean
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
      list: [] as IGiftCard[]
    }
  },
  actions: {
    async listGiftCards() {
      const promise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID
      )
  
      await promise.then((response) => {
        this.list = response.documents as IGiftCard[]
        console.log(response.documents)
      }).catch((error) => {
        console.log(error)
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

    async getGiftCard(id: IGiftCard['$id']) {
      const promise = databases.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_GIFT_CARD_COLLECTION_ID,
        id
      )
  
      await promise.then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
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
  },
})
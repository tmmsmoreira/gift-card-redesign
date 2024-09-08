import type { Models } from "appwrite";

export enum EModalActions {
  CREATE = 'create',
  UPDATE = 'update',
  VIEW = 'view'
}

export interface IGiftCard extends Models.Document {
  name: string,
  type: "price" | "service",
  typeData: string,
  code: string,
  status: boolean
}

interface IGiftCardsStore {
  loading: boolean,
  list: IGiftCard[],
  totalDocuments: number
  selectedItem: IGiftCard | null
}
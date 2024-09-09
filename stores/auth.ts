import { defineStore } from 'pinia';
import useAppWrite from "../composables/useAppWrite"
import type { Models } from "appwrite";

interface IAuthStore {
  user: Models.User<Models.Preferences> | null
}

const router = useRouter()
const { account } = useAppWrite()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null,
    } as IAuthStore
  },
  actions: {
    async login(email: string, password: string) {
      try {
        await account.createEmailPasswordSession(email, password)
        this.getCurrentUser()
      } catch (error) {
        console.error('Login error:', error)
      }
    },

    async getCurrentUser() {
      try {
        const response = await account.get();
        this.user = response;
      } catch (error: any) {
        if (error.code === 401) {
          console.error('User not authenticated:', error.message)
          this.user = null
        } else {
          console.error('Error fetching user:', error)
        }
      }
    },

    async logout() {
      try {
        await account.deleteSession('current')
        this.user = null;
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
  },
})
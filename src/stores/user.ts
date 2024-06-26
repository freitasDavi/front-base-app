import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const deleteToken = () => {
    token.value = ''
  }

  const isUserLoggedIn = () => {
    return token.value.length > 0
  }

  return { setToken, deleteToken, isUserLoggedIn, token }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { deleteCookie, getCookie } from '@/lib/cookies'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  if (getCookie('@tkn-auth')) {
    token.value = getCookie('@tkn-auth')
  }

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const deleteToken = () => {
    deleteCookie('@tkn-auth')
    token.value = ''
  }

  const isUserLoggedIn = () => {
    return token.value.length > 0
  }

  console.log(token.value)

  return { setToken, deleteToken, isUserLoggedIn, token }
})

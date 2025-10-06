import { ofetch } from 'ofetch'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const baseURL = 'http://localhost:5119/api/'

const unAuthApi = ofetch.create({
  baseURL
})

const api = ofetch.create({
  baseURL,
  onRequest({ options }) {
    const { token } = useUserStore()

    console.log(token)

    options.headers = {
      Authorization: `Bearer ${token}`
    }
  },
  onResponseError({ response }) {
    if (response.status == 401) {
      const { deleteToken } = useUserStore()
      deleteToken()
      router.push('/login')
    }
  }
})

export { api, unAuthApi }

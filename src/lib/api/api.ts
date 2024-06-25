import { ofetch } from 'ofetch'
import type { TokenResponse } from './responses/TokenResponse'
import { deleteCookie, getCookie } from '../cookies'
import router from '@/router'

const baseURL = 'https://localhost:7172/api/'
let token = getCookie('tkn-auth')

const unAuthApi = ofetch.create({
  baseURL,
  onResponse({ request, response }) {
    if (request.toString().includes('Auth/login') && response.status == 201) {
      const tokenRes = response._data as TokenResponse

      token = tokenRes.msg
    }
  }
})

const api = ofetch.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  },
  onResponseError({ response }) {
    if (response.status == 401) {
      deleteCookie('tkn-auth')
      router.push('/login')
    }
  }
})

export { api, unAuthApi }

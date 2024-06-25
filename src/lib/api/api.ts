import { ofetch } from 'ofetch'
import type { TokenResponse } from './responses/TokenResponse'
import { getCookie } from '../cookies'

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
  onResponseError({ request, response, options }) {
    if (response.status == 401) {
      console.log('Não autorizado')
    }
  }
})

export { api, unAuthApi }

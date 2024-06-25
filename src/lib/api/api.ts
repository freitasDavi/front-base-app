import { ofetch } from 'ofetch'
import type { TokenResponse } from './responses/TokenResponse'

const baseURL = 'https://localhost:7172/api/'
let token = ''

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

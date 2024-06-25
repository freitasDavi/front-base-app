function setCookie(id: string, value: string) {
  document.cookie = `${id}=${value}`
}

function getCookie(id: string) {
  const value = document.cookie.match('(^|;)?' + id + '=([^;]*)(;|$)')

  return value ? value[2] : ''
}

function deleteCookie(id: string) {
  document.cookie = id + '=;'
}

export { setCookie, getCookie, deleteCookie }

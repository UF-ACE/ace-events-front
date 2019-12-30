import { useCookies } from "react-cookie";

const USER_SESSION = 'USER_SESSION'
const USER_NAME = 'USER_NAME'

export function isLoggedIn() {
  const session = useCookies()[0][USER_SESSION]
  return session !== undefined
}

export function loggedIn(name, token) {
  const [cookies, setCookie] = useCookies()
  setCookie(USER_NAME, name)
  setCookie(USER_SESSION, token)
}

export function logout() {
  const [cookies, setCookie, removeCookie] = useCookies()
  removeCookie(USER_SESSION)
  removeCookie(USER_NAME)
}
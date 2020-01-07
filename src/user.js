import { useCookies } from "react-cookie";

const USER_NAME = 'USER_NAME'
const USER_EMAIL = 'USER_EMAIL'
const USER_ROLE = 'USER_ROLE'

export function handleLoggedIn() {
  return new Promise((resolve, reject) => {
    const [cookies, setCookie] = useCookies()
    if (!cookies[USER_NAME] || cookies[USER_NAME] == "undefined") {
      console.log("Fetching data...")
      fetch('http://localhost/api/get_user.json').then(res => {
        if (res.status == 403) {
          resolve(false)
        } else {
          return res.json()
        }
      }).then((json) => {
        if (json) {
          setCookie(USER_NAME, json.content.name)
          setCookie(USER_EMAIL, json.content.email)
          setCookie(USER_ROLE, Number(json.content.role))
          resolve(true)
        }
      })
    } else {
      resolve(true)
    }
  })
}

export function loggedIn(name, email, role) {
  
}

export function logout() {
  const [cookies, setCookie, removeCookie] = useCookies()
  removeCookie(USER_NAME)
  removeCookie(USER_EMAIL)
  removeCookie(USER_ROLE)
}
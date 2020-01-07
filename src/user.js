import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const USER_NAME = 'USER_NAME'
const USER_EMAIL = 'USER_EMAIL'
const USER_ROLE = 'USER_ROLE'

export function useUser() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [cookies, setCookie] = useCookies()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!checked) {
      handleLoggedIn(cookies, setCookie).then((isLoggedIn) => {
        const foundUser = getUser(cookies)
        setLoggedIn(isLoggedIn)
        setUser(foundUser)
        setChecked(true)
      })
    }
  })

  return [loggedIn, user]
}

function handleLoggedIn(cookies, setCookie) {
  return new Promise((resolve, reject) => {
    if (!cookies[USER_NAME] || cookies[USER_NAME] == "undefined") {
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

function getUser(cookies) {
  return {
    name: cookies[USER_NAME],
    email: cookies[USER_EMAIL],
    role: cookies[USER_ROLE],
    isChair: cookies[USER_ROLE] > 0,
    isEBoard: cookies[USER_ROLE] > 1
  }
}

export function logout() {
  const [cookies, setCookie, removeCookie] = useCookies()
  removeCookie(USER_NAME)
  removeCookie(USER_EMAIL)
  removeCookie(USER_ROLE)
}
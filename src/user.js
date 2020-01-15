import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

const USER_NAME = 'USER_NAME'
const USER_EMAIL = 'USER_EMAIL'
const USER_ROLE = 'USER_ROLE'

const OPTIONS = {
  path: '/'
}

export function useUser() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [cookies, setCookie] = useCookies()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!checked) {
      handleLoggedIn(cookies, setCookie).then(({success, json}) => {
        let foundUser = {}
        if (json[USER_NAME]) {
          foundUser = getUser(json)
        } else {
          foundUser = getUser(cookies)
        }
        setLoggedIn(success)
        setUser(foundUser)
        setChecked(true)
      })
      setChecked(true)
    }
  })

  return [loggedIn, user]
}

function handleLoggedIn(cookies, setCookie) {
  return new Promise((resolve, reject) => {
    if (!cookies[USER_NAME] || cookies[USER_NAME] == "undefined") {
      fetch('/api/get_user.json').then(res => {
        if (res.status == 403) {
          resolve({success: false, json: {}})
        } else {
          return res.json()
        }
      }).then((json) => {
        if (json) {
          console.log(json)
          setCookie(USER_NAME, json.content.name, OPTIONS)
          setCookie(USER_EMAIL, json.content.email, OPTIONS)
          setCookie(USER_ROLE, Number(json.content.role), OPTIONS)
          resolve({success: true, json: {
            USER_NAME: json.content.name,
            USER_EMAIL: json.content.email,
            USER_ROLE: Number(json.content.role)
          }})
        }
      })
    } else {
      resolve({success: true, json: {}})
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

export function logout(removeCookie) {
  removeCookie(USER_NAME, OPTIONS)
  removeCookie(USER_EMAIL, OPTIONS)
  removeCookie(USER_ROLE, OPTIONS)
}
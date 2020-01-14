import { logout } from "./user"

export const NAV_LOGGED_IN = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Logout",
    preHref: (removeCookie) => logout(removeCookie),
    href: "/auth/logout"
  }
]

export const NAV_LOGGED_OUT = [
  {
    name: "Login",
    href: "/auth/ace_cloud"
  }
]

const EVENT_PLACE_HOLDER_DATA = {
  name: [
    "GBM #7",
    "Docker Technical Workshop",
    "Walmart Ice Cream Social",
    "Mentorship Speed Dating",
    "Google Internship Panel"
  ],

  location: [
    "Turlington Roof",
    "NEB Basement",
    "Marston Study Room Carr",
    "The Hub",
    "Third Floor SAI",
    "NPB 1011"
  ]
}

export function eventPlaceHolders() {
  return {
    name: EVENT_PLACE_HOLDER_DATA.name[Math.floor(Math.random() * EVENT_PLACE_HOLDER_DATA.name.length)],
    location: EVENT_PLACE_HOLDER_DATA.location[Math.floor(Math.random() * EVENT_PLACE_HOLDER_DATA.location.length)]
  }
}
export const NAV_LOGGED_IN = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "Events",
    href: "/event"
  },
  {
    name: "Profile",
    href: "/profile"
  },
  {
    name: "Logout",
    href: "/logout"
  }
]

export const NAV_LOGGED_OUT = [
  {
    name: "Login",
    href: "/auth/ace_cloud"
  }
]

export const MOCK_EVENT_DATA = [
  {
    name: "Mock Event of ACE",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eleifend lacus at mattis pretium. Duis tempus felis arcu, ac rutrum turpis varius ac. Ut ullamcorper elit at sapien semper tempor. Sed porttitor orci sapien, nec vehicula tellus finibus et. Nulla in nulla in est blandit ornare. Integer semper massa convallis eros consequat, in congue purus facilisis. Morbi vitae posuere tellus.`,
    beginDateTime: new Date(2020, 6, 15, 17, 30),
    endDateTime: new Date(2020, 6, 15, 19, 30),
    location: "Turlington E221",
    signInID: "QwEEd"
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
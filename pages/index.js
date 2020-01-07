import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch'
import { handleLoggedIn, logout } from '../src/user.js'
import { useState } from 'react'
const Home = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  handleLoggedIn().then(res => setLoggedIn(res))

  return (
    <>
      <Nav loggedIn={loggedIn} />
      <p>test</p>
    </>
  )
}

export default Home
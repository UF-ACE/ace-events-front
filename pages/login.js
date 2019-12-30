import { loggedIn } from '../src/user'
import Nav from '../components/nav'

const Login = (props) => {
  loggedIn('John Doe', 'awdjioawdjioawd')
  return (
    <>
    <Nav />
    <p>You are now logged in!</p>
    </>
  )
}

export default Login
import { useUser } from "../../../src/user"
import Nav from '../../../components/nav'

const SignIn = ({id}) => {
  const [loggedIn, user] = useUser()

  return (
    <>
    <Nav loggedIn={loggedIn} />
    </>
  )
}

SignIn.getInitialProps = async ({ query }) => {
  // Would request the website usually, mock for now
  const { id } = query
  return { id }
}

export default SignIn
import { useUser } from "../../../src/user"
import Nav from '../../../components/nav'
import { signInToEvent } from '../../../src/event'
import { useState, useEffect } from "react"
import { Spinner } from "react-bootstrap"
import { useRouter } from "next/router"

const SignIn = ({id}) => {
  const router = useRouter()
  const [loggedIn] = useUser()
  const [signingIn, setSigningIn] = useState(true)
  const [resErrors, setErrors] = useState({})
  const [resSuccess, setSuccess] = useState(false)

  if (signingIn) {
    signInToEvent(id).then(({success, status, errors}) => {
      
      setErrors({ status, errors: errors.error})
      setSuccess(success)
    })
    setSigningIn(false)
  }

  if (!signingIn && resErrors.status == 403) {
    router.push('/auth/ace_cloud')
  }

  const signInElements = (
    <Spinner animation="border" role="status" className='mx-auto'>
      <span className="sr-only">Loading...</span>
    </Spinner>
  )

  const duplicateAttendeeError = resErrors.errors && resErrors.errors.user && resErrors.errors.user[0] === 'has already been taken'
  ?  "You have already signed in for this event." : null

  const errorMessage = resErrors.status == 404 ? "Invalid Sign In Link" : duplicateAttendeeError
  const successMessage = 'You have successfully signed in.'

  return (
    <>
      <Nav loggedIn={loggedIn} />
      {signingIn ? signInElements : null}
      <h4 className='text-center my-2'>{resSuccess && !signingIn ? successMessage : errorMessage}</h4>
    </>
  )
}

SignIn.getInitialProps = async ({ query }) => {
  // Would request the website usually, mock for now
  const { id } = query
  return { id }
}

export default SignIn
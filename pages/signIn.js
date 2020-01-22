import React, { useState, useEffect } from "react"

import { useUser } from "../src/user"
import { signInToEvent } from '../src/event'
import { Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"

const SignIn = () => {
  const [signingIn, setSigningIn] = useState(true)
  const [resErrors, setErrors] = useState({})
  const [resSuccess, setSuccess] = useState(false)
  const { id } = useParams()

  if (signingIn && id) {
    signInToEvent(id).then(({success, status, errors}) => {
      
      setErrors({ status, errors: errors.error})
      setSuccess(success)
    })
    setSigningIn(false)
  }

  if (!signingIn && resErrors.status == 403) {
    window.location.href = `/auth/ace_cloud?origin=${window.location.pathname}`
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
      {signingIn ? signInElements : null}
      <h4 className='text-center my-2'>{resSuccess && !signingIn ? successMessage : errorMessage}</h4>
    </>
  )
}

export default SignIn
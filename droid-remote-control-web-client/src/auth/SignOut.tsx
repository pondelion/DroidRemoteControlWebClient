import React from 'react'
import '../App.css'

import { CognitoUserPool } from 'amazon-cognito-identity-js'
import Button from '@material-ui/core/Button'
import awsConfiguration from '../AwsConfiguration'


const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.USER_POOL_ID,
  ClientId: awsConfiguration.CLIENT_ID,
})

type Props = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean|null>>;
}

const SignOut: React.FC<Props> = (props: Props) => {

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
      localStorage.clear()
      console.log('signed out')
      props.setSignedIn(false)
    } else {
      localStorage.clear()
      console.log('no user signing in')
    }
  }

  return (
    <div className="SignOut">
      <h1>You're now signed in.</h1>
      <Button variant="contained" color="primary" onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default SignOut

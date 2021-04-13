import React from 'react'
import '../App.css'

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import awsConfiguration from '../AwsConfiguration'


const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.USER_POOL_ID,
  ClientId: awsConfiguration.CLIENT_ID,
})

type Props = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean|null>>;
}

const SignIn: React.FC<Props> = (props: Props) => {
  const [username, setUserName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [errMsg, setErrMsg] = React.useState<string>('')
  const changedUserNameHaldler = (e: any) => setUserName(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)

  const signIn = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username : username,
      Password : password
    })
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('result: ' + result)
        const accessToken = result.getAccessToken().getJwtToken()
        console.log('AccessToken: ' + accessToken)
        setUserName('')
        setPassword('')
        setErrMsg('')
        props.setSignedIn(true)
      },
      onFailure: (err) => {
        console.error(err)
        setErrMsg(err.message)
      }
    })
  }

  return (
    <div className="SignIn">
      <h1>Sign In</h1>
      <div>
        <Input type="text" placeholder='username' onChange={changedUserNameHaldler}/>
        <Input type="text" placeholder='password' onChange={changedPasswordHandler}/>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={signIn}>Sign In</Button>
      </div>
      <div style={{color:'red', fontWeight:'bold'}}>{errMsg}</div>
    </div>
  )
}

export default SignIn

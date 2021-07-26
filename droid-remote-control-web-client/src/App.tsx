import React, { useEffect } from 'react';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import Container from '@material-ui/core/Container'
import awsConfiguration from './AwsConfiguration';
import SignIn from './auth/SignIn';
// import SignOut from './auth/SignOut';
import RemoteControl from './pages/RemoteControl';
import ButtonAppBar from './components/Header'


Amplify.configure({
  Auth: {
      identityPoolId: awsConfiguration.IDENTITY_POOL_ID,
      region: awsConfiguration.REGION,
      userPoolId: awsConfiguration.USER_POOL_ID,
      userPoolWebClientId: awsConfiguration.CLIENT_ID,
  }
});

Auth.currentCredentials().then(info => {
  const cognitoIdentityId = info.identityId;
  console.log("cognito identity id", cognitoIdentityId);
  Amplify.addPluggable(new AWSIoTProvider({
    aws_pubsub_region: awsConfiguration.REGION,
    aws_pubsub_endpoint: `wss://${awsConfiguration.IOT_ENDPOINT}/mqtt`,
    clientId: awsConfiguration.IOT_THING_NAME
  }));
});

const App: React.FC = () => {

  const [signedIn, setSignedIn] = React.useState<boolean|null>(null);
  const [signedInUserName, setSignedInUserName] = React.useState<string>("");

  useEffect(() => {
    const checkSignedIn = async () => {
      const userInfo  = await Auth.currentUserInfo();
      if (userInfo) {
        setSignedIn(true);
        setSignedInUserName(userInfo.username);
        console.log('signed in');
      } else {
        setSignedIn(false);
        setSignedInUserName("");
        console.log('signed out');
      }
    }
    checkSignedIn();
  }, [])

  const signedInContents = () => {
    return (
      <div className="authorizedMode">
        <h3>You're now signed in as {signedInUserName}.</h3>
        {/* <SignOut setSignedIn={setSignedIn} /> */}
        <RemoteControl />
      </div>
    )
  }

  const signedOutContents = () => {
    return (
      <div className="unauthorizedMode">
        <SignIn setSignedIn={setSignedIn} />
      </div>
    )
  }

  const contents = () => {
    if (signedIn === null) {
      return (
        <div>Checking signed in status...</div>
      )
    } else if (signedIn === true) {
      return signedInContents();
    } else if (signedIn === false) {
      return signedOutContents();
    }
  }

  return (
    <div className="App">
      <ButtonAppBar signedIn={signedIn} setSignedIn={setSignedIn}/>
      <Container component="main" maxWidth="lg">
        <div>
        { contents() }
        </div>
      </Container>
    </div>
  )
}

export default App;
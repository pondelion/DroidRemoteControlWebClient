import './App.css';
import Amplify, { PubSub, Auth } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import awsConfiguration from '../AwsConfiguration'


Amplify.configure({
    Auth: {
        identityPoolId: awsConfiguration.IDENTITY_POOL_ID, 
        region: awsConfiguration.REGION,
        userPoolId: awsConfiguration.USER_POOL_ID, 
        userPoolWebClientId: awsConfiguration.CLIENT_ID, 
    }
});

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: awsConfiguration.REGION,
  aws_pubsub_endpoint: `wss://${awsConfiguration.IOT_ENDPOINT}/mqtt`,
  clientId: awsConfiguration.IOT_THING_NAME
}))


class PubSubHelper {

  static async publish(
    topic: string,
    message: string,
  ) {
    await PubSub.publish(topic, message)    
  }
  
  static async subscribe(
    topic: string,
    onReceiveCallback: (msg: string) => void,
    onErrorCallback: (err: any) => void = (err: any) => { console.log(err) },
    onCompleteCallback: () => void = () => { console.log('Subscribe complete') },
  ) {
    await PubSub.subscribe(topic).subscribe({
      next: onReceiveCallback,
      error: onErrorCallback,
      complete: onCompleteCallback,
    })
  }

}
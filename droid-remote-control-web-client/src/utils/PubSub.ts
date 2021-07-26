import { PubSub } from 'aws-amplify';


export class PubSubHelper {

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
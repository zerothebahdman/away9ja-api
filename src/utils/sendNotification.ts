/* eslint-disable @typescript-eslint/no-explicit-any */
import FirebaseAdmin from 'firebase-admin';
import serviceAccount from '../../config/awaynaija-6f74f-firebase-adminsdk-9dckx-958a70a643.json';
import log from '../logging/logger';

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount as any),
});
const fcm = FirebaseAdmin.messaging();

// const serverKey = config.FIREBASE_SERVER_KEY; //put your server key here

async function sendNotificationToUser(
  deviceIds: string[],
  title: string,
  body: string,
) {
  if (deviceIds.length !== 0) {
    log.info(`Sending notification to ${deviceIds.length} devices`);
    const message = {
      //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      tokens: deviceIds,
      notification: {
        title: title,
        body: body,
        sound: 'default',
      },
    };
    return fcm.sendMulticast(message);
  }
  return null;
}
export default sendNotificationToUser;

/* eslint-disable @typescript-eslint/no-explicit-any */
// import FirebaseAdmin from 'firebase-admin';
// import serviceAccount from '../../config/awaynaija-6f74f-firebase-adminsdk-9dckx-958a70a643.json';
import log from '../logging/logger';
import {
  Expo,
  ExpoPushErrorReceipt,
  ExpoPushMessage,
  ExpoPushSuccessReceipt,
  ExpoPushSuccessTicket,
} from 'expo-server-sdk';
import config from '../../config/default';

// FirebaseAdmin.initializeApp({
//   credential: FirebaseAdmin.credential.cert(serviceAccount as any),
// });
// const fcm = FirebaseAdmin.messaging();
// const serverKey = config.FIREBASE_SERVER_KEY; //put your server key here

const expo = new Expo({ accessToken: config.expoAccessToken });

async function createMessages(
  title: string,
  pushTokens: string[],
  data?: object,
) {
  const messages = [];
  for (const pushToken of pushTokens) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      log.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken,
      // sound: 'default',
      title,
      data: Object.values(data).length > 0 ? data : null,
      badge: 1,
    });
  }
  return messages;
}

async function sendMessages(messages: ExpoPushMessage[]) {
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];
  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      log.error(error);
    }
  }
  return tickets;
}

async function getReceiptIds(
  tickets: (ExpoPushSuccessTicket | ExpoPushErrorReceipt)[],
) {
  const receiptIds = [];
  for (const ticket of tickets as ExpoPushSuccessTicket[]) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  return receiptIds;
}

async function obtainReceipts(receiptIds: string[]) {
  const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  // Like sending notifications, there are different strategies you could use
  // to retrieve batches of receipts from the Expo service.
  for (const chunk of receiptIdChunks) {
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      log.info('receipts');
      log.info(receipts);
      // receipts may only be one object
      if (!Array.isArray(receipts)) {
        const receipt = receipts as unknown as
          | ExpoPushSuccessReceipt
          | ExpoPushErrorReceipt;
        if (receipt.status === 'ok') {
          continue;
        } else if (receipt.status === 'error') {
          log.error(
            `There was an error sending a notification: ${receipt.message}`,
          );
          if (receipt.details && receipt.details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            // You must handle the errors appropriately.
            log.error(`The error code is ${receipt.details.error}`);
          }
        }
        return;
      }
      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (const receipt of receipts) {
        if (receipt.status === 'ok') {
          continue;
        } else if (receipt.status === 'error') {
          log.error(
            `There was an error sending a notification: ${receipt.message}`,
          );
          if (receipt.details && receipt.details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            // You must handle the errors appropriately.
            log.error(`The error code is ${receipt.details.error}`);
          }
        }
      }
    } catch (error) {
      log.error(error);
    }
  }
}

async function sendNotificationToUser(
  deviceIds: string[],
  title: string,
  body?: string,
) {
  const messages = await createMessages(title, deviceIds, { body });
  const tickets = await sendMessages(messages);
  const receiptIds = await getReceiptIds(tickets);
  await obtainReceipts(receiptIds);
}

export default sendNotificationToUser;

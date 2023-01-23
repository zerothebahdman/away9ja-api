import config from '../../config/default';

const USER_ACCOUNT_VERIFIED_BY_REFERRER = (fullName: string) => `
    <div style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #000; line-height: 1.5;">
      <p>Hi ${fullName},</p>
      <p>Your account has been verified by your referrer.</p>
      <p>Thank you for using ${config.appName}.</p>
    </div>
  `;

export default USER_ACCOUNT_VERIFIED_BY_REFERRER;

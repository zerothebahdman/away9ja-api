import config from '../../config/default';
import NodemailerModule from '../modules/NodemailerModule';
import log from '../logging/logger';
import PASSWORD_RESET_EMAIL from '../mail/password-reset';
import WELCOME_EMAIL from '../mail/welcome-email';
import EMAIL_VERIFICATION from '../mail/email-verification';
import USER_ACCOUNT_VERIFIED_BY_REFERRER from '../mail/account-verified';
import USER_INVITATION from '../mail/user-invitation';
const _nodeMailerModule = new NodemailerModule();

const emailType: EmailType = {
  WELCOME_EMAIL: [`Welcome to ${config.appName}`, 'welcome'],
  PASSWORD_RESET_INSTRUCTION: ['Password Reset Requested', 'password-reset'],
  PASSWORD_RESET_SUCCESSFUL: ['Password Reset', 'password-reset-successful'],
  EMAIL_VERIFICATION: ['Email Verification Requested', 'email-verification'],
  PASSWORD_CHANGED: ['Password Changed', 'password-changed'],
  ACCOUNT_VERIFIED: [
    'Your referrer has verified your account',
    'account-verified',
  ],
  USER_INVITATION: ['You have been invited to join', 'user-invitation'],
};

type Data = {
  [T: string]: string;
};

type EmailOptions = {
  from: string;
  to: string;
  html?: string;
  fullName?: string;
  subject?: string;
};

type EmailType = {
  [k: string]: string[];
};
export default class EmailService {
  /** Send email takes the following parameters:
   * type - refers to the type of the email eg WelcomeEmail
   * to - refers to who you are sending the email to
   * data - refers to what you want to send to the user
   */
  async _sendMail(type: string, email: string, data: Data) {
    const mailOptions: EmailOptions = {
      from: config.from,
      to: email,
    };
    const [subject, templatePath] = emailType[type] || [];
    if (!subject || !templatePath) return;
    switch (templatePath) {
      case 'welcome':
        mailOptions.html = WELCOME_EMAIL(data.fullName, data.url, email);
        mailOptions.subject = `${subject} ${data.fullName}`;
        break;
      case 'password-reset':
        mailOptions.html = PASSWORD_RESET_EMAIL(
          data.fullName,
          data.token,
          email,
        );
        mailOptions.subject = `[${config.appName}] - ${subject}`;
        break;
      case 'email-verification':
        mailOptions.html = EMAIL_VERIFICATION(data.fullName, data.token, email);
        mailOptions.subject = `[${config.appName}] ${subject}`;
        break;
      case 'account-verified':
        mailOptions.html = USER_ACCOUNT_VERIFIED_BY_REFERRER(
          data.fullName,
          email,
        );
        mailOptions.subject = `[${config.appName}] ${subject}`;
        break;
      case 'user-invitation':
        mailOptions.html = USER_INVITATION(data.fullName, data.code, email);
        mailOptions.subject = `${subject} ${config.appName}`;
        break;
    }
    await _nodeMailerModule.send(mailOptions);
    log.info(`Email on it's way to ${email}`);
  }

  async _sendWelcomeEmail(fullName: string, email: string) {
    const url = `${config.FRONTEND_APP_URL}/sign-in`;
    return await this._sendMail('WELCOME_EMAIL', email, { fullName, url });
  }

  async _sendUserEmailVerificationEmail(
    fullName: string,
    email: string,
    token: string,
  ) {
    return await this._sendMail('EMAIL_VERIFICATION', email, {
      fullName,
      token,
    });
  }

  async _sendUserPasswordResetInstructionEmail(
    fullName: string,
    email: string,
    token: string,
  ) {
    return await this._sendMail('PASSWORD_RESET_INSTRUCTION', email, {
      fullName,
      token,
    });
  }

  async sendUserAccountVerifiedEmail(to: string, fullName: string) {
    return await this._sendMail('ACCOUNT_VERIFIED', to, {
      fullName,
    });
  }

  async sendUserInvitationEmail(to: string, fullName: string, code: string) {
    return await this._sendMail('USER_INVITATION', to, {
      fullName,
      code,
    });
  }
}

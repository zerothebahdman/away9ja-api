import config from '../../config/default';
const USER_INVITATION = (fullName: string, code: string) => `
    <div style="font-family: 'Roboto', sans-serif; font-size: 14px; color: #000; line-height: 1.5;">
        <p>Hi,</p>
        <p>${fullName} just sent you an invite to join ${config.appName}.</p>
        <p>Use the invite code below to complete your registration.</p>
        <p>Invite Code: ${code}</p>
        <p>Thank you for using ${config.appName}.</p>
    </div>
    `;
export default USER_INVITATION;

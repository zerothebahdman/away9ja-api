//import config from '../../config/default';
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const USER_ACCOUNT_VERIFIED_BY_REFERRER = (fullName: string, email: string) => `
    <!DOCTYPE html>
    <html
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      lang="en"
    >
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }

          p {
            line-height: inherit;
          }

          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }

          @media (max-width: 705px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }

            .icons-inner {
              text-align: center;
            }

            .icons-inner td {
              margin: 0 auto;
            }

            .row-content {
              width: 100% !important;
            }

            .mobile_hide {
              display: none;
            }

            .stack .column {
              width: 100%;
              display: block;
            }

            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>

      <body
        style="
          background-color: #ffffff;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          class="nl-container"
          width="100%"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #ffffff;
          "
        >
          <tbody>
            <tr>
              <td>
                <table
                  class="row row-1"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #073f3f;
                  "
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 30px;
                                  padding-bottom: 30px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="image_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div
                                        class="alignment"
                                        align="left"
                                        style="line-height: 10px"
                                      >
                                        <img
                                          src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/947918_932400/Capture.PNG"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 137px;
                                            max-width: 100%;
                                          "
                                          width="137"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-2"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="image_block block-2"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 20px;
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                        padding-top: 60px;
                                      "
                                    >
                                      <div
                                        class="alignment"
                                        align="center"
                                        style="line-height: 10px"
                                      >
                                        <a
                                          href="https://www.pngitem.com/middle/JJombh_mail-email-icon-for-resume-blue-hd-png/"
                                          target="_blank"
                                          style="outline: none"
                                          tabindex="-1"
                                          ><img
                                            src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/947918_932400/image%2031.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 137px;
                                              max-width: 100%;
                                            "
                                            width="137"
                                        /></a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-3"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 5px;
                                        padding-right: 5px;
                                        padding-top: 5px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 20px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 200%;
                                          text-align: center;
                                          mso-line-height-alt: 40px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          <strong>Verification successful!</strong>
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-4"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 15px;
                                        padding-left: 5px;
                                        padding-top: 15px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #073f3f;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 21px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 200%;
                                          text-align: left;
                                          mso-line-height-alt: 42px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          <strong>Hello ${fullName},</strong>
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-5"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 10px;
                                        padding-left: 5px;
                                        padding-right: 10px;
                                        padding-top: 10px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 200%;
                                          text-align: left;
                                          mso-line-height-alt: 32px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          Thank you for creating an account with
                                          Away Naija.<br />We’d like to confirm that
                                          your account was created successfully and
                                          has been fully verified by your
                                          referral.<br /><br />To get you started,
                                          kindly return to the app and 
                                          login to continue.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-6"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <div
                                  class="spacer_block"
                                  style="
                                    height: 60px;
                                    line-height: 60px;
                                    font-size: 1px;
                                  "
                                >
                                  &#8202;
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-7"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="button_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        text-align: center;
                                        padding-top: 10px;
                                        padding-right: 10px;
                                        padding-bottom: 130px;
                                        padding-left: 10px;
                                      "
                                    >
                                      <div class="alignment" align="center">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:114px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#073f3f"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                        <div
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #ffffff;
                                            background-color: #073f3f;
                                            border-radius: 4px;
                                            width: auto;
                                            border-top: 0px solid transparent;
                                            font-weight: 400;
                                            border-right: 0px solid transparent;
                                            border-bottom: 0px solid transparent;
                                            border-left: 0px solid transparent;
                                            padding-top: 5px;
                                            padding-bottom: 5px;
                                            font-family: Arial, Helvetica,
                                              sans-serif;
                                            font-size: 16px;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                        >
                                          <span
                                            style="
                                              padding-left: 40px;
                                              padding-right: 40px;
                                              font-size: 16px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              dir="ltr"
                                              style="
                                                word-break: break-word;
                                                line-height: 32px;
                                              "
                                              >Login</span
                                            ></span
                                          >
                                        </div>
                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-8"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td class="pad">
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 120%;
                                          text-align: left;
                                          mso-line-height-alt: 19.2px;
                                        "
                                      >
                                        <p style="margin: 0; margin-bottom: 16px">
                                          Sincerely,
                                        </p>
                                        <p style="margin: 0">
                                          The Away Naija Team.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  class="divider_block block-2"
                                  width="100%"
                                  border="0"
                                  cellpadding="25"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                >
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                          width="100%"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                          "
                                        >
                                          <tr>
                                            <td
                                              class="divider_inner"
                                              style="
                                                font-size: 1px;
                                                line-height: 1px;
                                                border-top: 3px solid #073f3f;
                                              "
                                            >
                                              <span>&#8202;</span>
                                            </td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-9"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="50%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-2"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 15px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 15px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 13px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 200%;
                                          text-align: center;
                                          mso-line-height-alt: 26px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          <span style="color: #292a3d"
                                            >Privacy policy</span
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td
                                class="column column-2"
                                width="50%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-2"
                                  width="100%"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td
                                      class="pad"
                                      style="
                                        padding-bottom: 15px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 15px;
                                      "
                                    >
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 13px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 200%;
                                          text-align: center;
                                          mso-line-height-alt: 26px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          <span style="color: #233d63"
                                            >Terms of service</span
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  class="row row-10"
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          class="row-content stack"
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-radius: 0;
                            color: #000000;
                            width: 685px;
                          "
                          width="685"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                width="100%"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 5px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                              >
                                <table
                                  class="paragraph_block block-1"
                                  width="100%"
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td class="pad">
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 13px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 120%;
                                          text-align: left;
                                          mso-line-height-alt: 15.6px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          Copyright Away Naija, ${currentYear}, All rights
                                          reserved.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  class="paragraph_block block-2"
                                  width="100%"
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                >
                                  <tr>
                                    <td class="pad">
                                      <div
                                        style="
                                          color: #101112;
                                          direction: ltr;
                                          font-family: Arial, Helvetica, sans-serif;
                                          font-size: 13px;
                                          font-weight: 400;
                                          letter-spacing: 0px;
                                          line-height: 120%;
                                          text-align: center;
                                          mso-line-height-alt: 15.6px;
                                        "
                                      >
                                        <p style="margin: 0">
                                          The email was sent by Away Naija to
                                          ${email}. It is intended for the
                                          individual or entity that it is addressed
                                          to, and may contain confidential
                                          information. If you are not the intended
                                          recipient, please contact us at
                                          howfar@awaynaija.com.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>


  `;

export default USER_ACCOUNT_VERIFIED_BY_REFERRER;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

const sendEmployeeEmail = async (
  to,
  password,
  restaurantName = "Your Restaurant"
) => {
  await transporter.sendMail({
    from: `"${restaurantName} HR Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Welcome to ${restaurantName}`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Employee Welcome</title>
    </head>

    <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
        <tr>
          <td align="center">

            <!-- CONTAINER -->
            <table width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">

              <!-- HEADER -->
              <tr>
                <td style="background:linear-gradient(135deg,#0f172a,#2563eb); padding:30px; text-align:center; color:#ffffff;">
                  <h1 style="margin:0; font-size:24px;">${restaurantName}</h1>
                  <p style="margin:8px 0 0; font-size:13px; opacity:0.9;">
                    Employee Access Details
                  </p>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:30px;">
                  
                  <h2 style="margin-top:0; color:#111827;">
                    Welcome to the Team 🎉
                  </h2>

                  <p style="color:#374151; font-size:15px; line-height:1.6;">
                    Your employee account has been successfully created. 
                    Below are your login credentials to access the system.
                  </p>

                  <!-- CREDENTIAL BOX -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin:20px 0; border:1px solid #e5e7eb; border-radius:10px;">
                    
                    <tr>
                      <td style="padding:18px; background:#f9fafb;">
                        <p style="margin:6px 0; font-size:14px;">
                          <strong>Email:</strong> ${to}
                        </p>
                        <p style="margin:6px 0; font-size:14px;">
                          <strong>Password:</strong> ${password}
                        </p>
                      </td>
                    </tr>

                  </table>

                  <!-- WARNING BOX -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                    style="margin:20px 0; border:1px solid #fecaca; background:#fef2f2; border-radius:10px;">
                    <tr>
                      <td style="padding:15px;">
                        <p style="margin:0; font-size:13px; color:#991b1b;">
                          🔐 For security reasons, please log in and change your password immediately.
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- BUTTON -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
                    <tr>
                      <td align="center">
                        <a href="http://localhost:5173/employee-login"
                          style="
                            background:#2563eb;
                            color:#ffffff;
                            padding:14px 28px;
                            border-radius:8px;
                            text-decoration:none;
                            font-size:14px;
                            font-weight:bold;
                            display:inline-block;
                            box-shadow:0 4px 12px rgba(37,99,235,0.3);
                          ">
                          🚀 Login to Dashboard
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- FALLBACK LINK -->
                  <p style="font-size:13px; color:#6b7280; word-break:break-all;">
                    If the button doesn’t work, use this link:
                    <br/>
                    <a href="http://localhost:5173/employee-login" style="color:#2563eb;">
                      http://localhost:5173/employee-login
                    </a>
                  </p>

                  <p style="color:#6b7280; font-size:13px; margin-top:20px;">
                    If you were not expecting this email, please contact your administrator immediately.
                  </p>

                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="background:#f1f5f9; padding:20px; text-align:center;">
                  <p style="margin:0; font-size:12px; color:#64748b;">
                    © ${new Date().getFullYear()} ${restaurantName}. All rights reserved.
                  </p>
                  <p style="margin:5px 0 0; font-size:12px; color:#94a3b8;">
                    Powered by Restaurant Management System
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
    `,
  });
};

module.exports = { sendEmployeeEmail };
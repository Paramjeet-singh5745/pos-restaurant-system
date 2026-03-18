const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

const sendRestaurantEmail = async (to, restaurantName) => {
  await transporter.sendMail({
    from: `"${restaurantName} Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Welcome to ${restaurantName}!`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome Email</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8; padding:20px 0;">
        <tr>
          <td align="center">
            
            <!-- CONTAINER -->
            <table width="600" cellpadding="0" cellspacing="0" 
              style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 25px rgba(0,0,0,0.08);">
              
              <!-- HEADER -->
              <tr>
                <td style="background:linear-gradient(135deg,#1e293b,#2563eb); padding:30px; text-align:center; color:#ffffff;">
                  <h1 style="margin:0; font-size:24px; letter-spacing:0.5px;">
                    ${restaurantName}
                  </h1>
                  <p style="margin:8px 0 0; font-size:13px; opacity:0.9;">
                    Restaurant Management System
                  </p>
                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:30px;">
                  
                  <h2 style="margin-top:0; color:#111827;">
                    Welcome 
                  </h2>

                  <p style="color:#374151; font-size:15px; line-height:1.6;">
                    We're excited to have you on board! Your restaurant has been 
                    successfully registered on our platform. You can now start managing 
                    orders, tables, and menus with ease.
                  </p>

                  <!-- INFO BOX -->
                  <table width="100%" cellpadding="0" cellspacing="0" 
                    style="margin:20px 0; border:1px solid #e5e7eb; border-radius:10px;">
                    
                    <tr>
                      <td style="padding:15px; background:#f9fafb;">
                        <p style="margin:5px 0; font-size:14px;">
                          <strong>Restaurant Name:</strong> ${restaurantName}
                        </p>
                        <p style="margin:5px 0; font-size:14px;">
                          <strong>Email:</strong> ${to}
                        </p>
                      </td>
                    </tr>

                  </table>

                  <!-- BUTTON -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
                    <tr>
                      <td align="center">
                        <a href="https://pos-restaurant-system.vercel.app/"
                          style="
                            background:#2563eb;
                            color:#ffffff;
                            padding:14px 28px;
                            border-radius:8px;
                            text-decoration:none;
                            font-size:14px;
                            font-weight:bold;
                            display:inline-block;
                            box-shadow:0 4px 10px rgba(37,99,235,0.3);
                          ">
                          Go to Login
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="color:#6b7280; font-size:13px; line-height:1.5;">
                    If you did not register this restaurant, please ignore this email 
                    or contact our support team.
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
                    Made with ❤️ for restaurant owners
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

module.exports = { sendRestaurantEmail };
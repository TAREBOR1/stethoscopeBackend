const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Face of Stethoscope</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: 'Inter', sans-serif;
      line-height: 1.5;
    }

    .container {
      max-width: 520px;
      margin: 60px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .header {
      background: linear-gradient(135deg, #7e22ce 0%, #9333ea 100%);
      color: #ffffff;
      text-align: center;
      padding: 32px 20px 24px;
    }

    .header img {
      width: 72px;
      margin-bottom: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.25px;
    }

    .content {
      padding: 32px 36px 40px;
      color: #111827;
    }

    .content p {
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 20px;
      color: #374151;
    }

    .otp-container {
      margin: 28px 0 32px;
      text-align: center;
    }

    .otp-box {
      display: inline-block;
      padding: 16px 24px;
      background-color: #f3e8ff;
      color: #7e22ce;
      font-weight: 700;
      font-size: 24px;
      border-radius: 8px;
      letter-spacing: 4px;
      text-align: center;
      border: 1px solid #e9d5ff;
      box-shadow: 0 2px 8px rgba(126, 34, 206, 0.1);
    }

    .highlight {
      color: #7e22ce;
      font-weight: 600;
    }

    .footer {
      font-size: 13px;
      color: #6b7280;
      text-align: center;
      padding: 24px 10px 32px;
      border-top: 1px solid #e5e7eb;
    }

    .footer a {
      color: #9333ea;
      text-decoration: none;
    }

    @media only screen and (max-width: 540px) {
      .container {
        width: 90%;
        margin: 40px auto;
      }

      .content {
        padding: 24px;
      }

      .otp-box {
        font-size: 20px;
        padding: 14px 20px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <img src="http://res.cloudinary.com/dkg6vgwit/image/upload/v1755267016/vmuzez478boa11hv4rri.jpg" alt="Logo">
      <h1>Face of Stethoscope</h1>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">{{user}}</span>,</p>
      <p>You're just one step away from verifying your account for:</p>
      <p><strong class="highlight">{{email}}</strong></p>
      <p>Please use the following verification code to complete your registration:</p>
      
      <div class="otp-container">
        <div class="otp-box">{{otp}}</div>
      </div>
      
      <p>This verification code will expire in <strong>10 minutes</strong>. For your security, please do not share this code with anyone.</p>
      <p>If you didn't request this, please ignore this email or contact support if you have questions.</p>
    </div>
    <div class="footer">
      &copy; {{year}} Face of Stethoscope. All rights reserved.<br>
      <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
    </div>
  </div>
</body>

</html>`;

module.exports = { EMAIL_TEMPLATE };
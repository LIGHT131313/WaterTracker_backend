const resetPasswordEmail = (BASE_URL, resetLink, userName) => {
  return ` <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f7fa;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
       <div style="text-align: center;">
        <a href="${BASE_URL}">
          <img src="https://res.cloudinary.com/doj55bihz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1704651372/img/Logo-890d13ba_to7trg.jpg?_s=public-apps" alt="Logo" style="max-width: 100px; margin: 0 auto;">
          </a>
        </div>
        <h2 style="color: #407BFF; font-size: 24px; margin-top: 20px; margin-bottom: 20px; text-align: center;">Password Reset Request</h2>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello,</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">You are receiving this email because we received a password reset request for your account. If you did not request a password reset, please ignore this email.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" target="_blank" style="background-color: #407BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 16px;">Reset Password</a>
        </div>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">This link is valid for the next hour.</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you are having trouble clicking the link, please copy and paste it into your web browser's address bar.</p>
        <p style="color: #333333; font-size: 16px; margin-top: 30px; margin-bottom: 20px ;">Thank you, ${userName}</p>
        <div style="text-align: center;">
        <a href="${BASE_URL}">
          <img src="https://res.cloudinary.com/doj55bihz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1704651372/img/Logo-890d13ba_to7trg.jpg?_s=public-apps" alt="Logo" style="max-width: 100px; margin: 0 auto;">
          </a>
        </div>
      </div>
    </div>`;
};

export default resetPasswordEmail;

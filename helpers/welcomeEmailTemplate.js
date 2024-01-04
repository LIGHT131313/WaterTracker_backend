const welcomeEmailTemplate = (BASE_URL) => {
  return `<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f7fa;">
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center;">
                <a href="${BASE_URL}">
                    <img src="https://yanlozovskyi.github.io/water-tracker/assets/Logo-890d13ba.png" alt="Logo" style="max-width: 100px; margin: 0 auto;">
                </a>
            </div>
            <h2 style="color: #407BFF; font-size: 24px; margin-top: 20px; margin-bottom: 20px; text-align: center;">Welcome to our Water Tracker</h2>
            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 20px;">Hello,</p>
            <p style="color: #333333; font-size: 16px; line-height: 1.5;">Welcome to WaterTracker, your personal hydration companion! 🌊 We're thrilled to have you on board. Staying hydrated is essential for a healthy lifestyle, and we're here to help you on your journey.</p>

            <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-top: 20px;">Here's what you can do with WaterTracker:</p>
            <ul style="color: #333333; font-size: 16px; line-height: 1.5; padding-left: 20px;">
                <li>Track Your Water Intake: Log your daily water consumption effortlessly.</li>
                <li>Set Hydration Goals: Customize your daily water goals based on your needs.</li>
                <li>Stay Consistent: Receive friendly reminders to keep sipping throughout the day.</li>
                <li>Visualize Your Progress: Monitor your hydration trends with insightful charts.</li>
            </ul>

            <p style="color: #333333; font-size: 16px; margin-top: 30px; margin-bottom: 20px;">Ready to get started? Log in now and take the first step towards a healthier, more hydrated you!</p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${BASE_URL}/api/auth/login" target="_blank" style="background-color: #407BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 16px;">Log in now</a>
            </div>

            <div style="text-align: center;">
                <a href="${BASE_URL}">
                    <img src="https://yanlozovskyi.github.io/water-tracker/assets/Logo-890d13ba.png" alt="Logo" style="max-width: 100px; margin: 0 auto;">
                </a>
            </div>
        </div>
    </div>`;
};

export default welcomeEmailTemplate;

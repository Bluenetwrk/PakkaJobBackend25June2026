const express = require('express');
const { linkedInCallback, getUser } = require('../Authcontroller');

const AuthRoutes = express.Router();

AuthRoutes.get('/LinkedIn/callback',linkedInCallback,
async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user profile
    const [profileRes, emailRes] = await Promise.all([
      axios.get('https://api.linkedin.com/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const profile = profileRes.data;
    const email = emailRes.data.elements[0]['handle~'].emailAddress;

    // Find or create user
    let user = await User.findOne({ linkedinId: profile.id });
    if (!user) {
      user = await User.create({
        linkedinId: profile.id,
        firstName: profile.localizedFirstName,
        lastName: profile.localizedLastName,
        email,
      });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect or send token to frontend
    res.redirect(`https://www.itwalkin.com/login/success?token=${token}`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'LinkedIn login failed' });
  }
});
//AuthRoutes.get('/callback', linkedInCallback);
AuthRoutes.get('/get-user', getUser);

module.exports = AuthRoutes;
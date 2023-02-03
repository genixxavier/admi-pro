const { OAuth2Client } = require('google-auth-library');

const googleVerify = async (token) => {
    const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
 
    return ticket.getPayload();

}

module.exports = {
    googleVerify
}
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];
function getOAuth2Client() {
const content = fs.readFileSync("credentials.json");
const keys = JSON.parse(content).installed;
return new google.auth.OAuth2(
keys.client_id,
keys.client_secret,
keys.redirect_uris[0]
);
}
async function main() {
const oauth2Client = getOAuth2Client();
const authUrl = oauth2Client.generateAuthUrl({
access_type: "offline",
scope: SCOPES
});
console.log("\nOpen this URL:\n", authUrl, "\n");
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question("Paste the code here: ", async (code) => {
const { tokens } = await oauth2Client.getToken(code);
console.log("\nYOUR REFRESH TOKEN:\n", tokens.refresh_token);
fs.writeFileSync("token.json", JSON.stringify(tokens));
rl.close();
});
}
main();

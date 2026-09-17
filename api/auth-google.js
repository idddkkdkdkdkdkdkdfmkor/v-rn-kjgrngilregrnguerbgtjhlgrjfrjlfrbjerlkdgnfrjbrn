const CLIENT_ID = "moc.tnetnocresuelgoog.sppa.bqjo98us87da02iul53iee5f2uc36o1a-093319789915".split('').reverse().join('');
const REDIRECT_URI = "https://idcraft.dpdns.org/api/auth-google-callback";

export default function handler(req, res) {
  const authorizeUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent('https://www.googleapis.com/auth/business.manage email profile')}&access_type=offline&prompt=consent`;
  res.setHeader('Location', authorizeUrl);
  res.status(302).end();
}

import jwt from 'jsonwebtoken';

// Environment variables
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  REDIRECT_URI,
  CLIENT_URL
} = process.env;

// Validate required environment variables
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !JWT_SECRET) {
  throw new Error('Missing required environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or JWT_SECRET');
}

export default async function googleAuth(fastify, opts) {
  const db = opts.db;

  // Google OAuth login route
  fastify.get('/auth/google', async (request, reply) => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'profile email',
      access_type: 'offline',
      prompt: 'consent'
    });

    reply.redirect(`${googleAuthUrl}?${params.toString()}`);
  });

  // Google OAuth callback route
  fastify.get('/auth/google/callback', async (request, reply) => {
    const { code } = request.query;

    if (!code) {
      return reply.redirect(`${CLIENT_URL}/login?error=no_code`);
    }

    try {
      // Exchange code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: GOOGLE_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      });

      const tokens = await tokenResponse.json();

      if (!tokens.access_token) {
        return reply.redirect(`${CLIENT_URL}/login?error=no_access_token`);
      }

      // Get user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      });

      const profile = await userInfoResponse.json();

      const email = profile.email;
      const name = profile.name || 'Google User';
      const picture = profile.picture || null;

      // Find or create user in database
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
          if (err) {
            console.error('Database error:', err);
            reply.redirect(`${CLIENT_URL}/login?error=db_error`);
            return reject(err);
          }

          if (user) {
            // User exists, update picture if needed
            if (picture && user.picture !== picture) {
              db.run('UPDATE users SET picture = ? WHERE id = ?', [picture, user.id]);
            }
            
            // Generate JWT token
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
            reply.redirect(`${CLIENT_URL}/home?token=${token}`);
            resolve(user);
          } else {
            // Create new user
            db.run(
              'INSERT INTO users (name, email, picture, password, gold) VALUES (?, ?, ?, ?, ?)',
              [name, email, picture, null, 1000],
              function (err) {
                if (err) {
                  console.error('Insert error:', err);
                  reply.redirect(`${CLIENT_URL}/login?error=insert_failed`);
                  return reject(err);
                }

                // Generate JWT token
                const token = jwt.sign({ userId: this.lastID }, JWT_SECRET, { expiresIn: '7d' });
                reply.redirect(`${CLIENT_URL}/home?token=${token}`);
                resolve({ id: this.lastID, name, email, picture });
              }
            );
          }
        });
      });
    } catch (error) {
      console.error('OAuth error:', error);
      reply.redirect(`${CLIENT_URL}/login?error=oauth_failed`);
    }
  });
}

export const googleAuthFixture = {
  // ==================== Token ID valide de Google ====================
  validIdToken: 'mock-google-id-token-12345',

  // ==================== Réponse de l'API tokeninfo de Google ====================
  validTokenInfoResponse: {
    // Identifiant Google de l'utilisateur
    sub: 'google-123456789',
    
    // Email vérifié
    email: 'john.doe@gmail.com',
    email_verified: true,
    
    // Informations de profil
    name: 'John Doe',
    given_name: 'John',
    family_name: 'Doe',
    picture: 'https://lh3.googleusercontent.com/a/default-user-1',
    
    // Métadonnées du token
    aud: process.env.GOOGLE_CLIENT_ID || 'mock-client-id.apps.googleusercontent.com',
    iss: 'https://accounts.google.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // Expire dans 1h
    
    // Autres champs possibles
    locale: 'en',
    hd: 'gmail.com', // Hosted domain
  },

  // ==================== Utilisateur existant (déjà enregistré) ====================
  existingUserTokenInfo: {
    sub: 'google-123456789',
    email: 'john.doe@gmail.com', // ← Correspond à usersFixture.singleValidUser
    email_verified: true,
    name: 'John Doe',
    picture: 'https://lh3.googleusercontent.com/a/default-user-1',
    aud: process.env.GOOGLE_CLIENT_ID || 'mock-client-id.apps.googleusercontent.com',
    iss: 'https://accounts.google.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  },

  // ==================== Nouvel utilisateur (pas encore enregistré) ====================
  newUserTokenInfo: {
    sub: 'google-new-user-001',
    email: 'newuser@gmail.com', // ← N'existe pas dans usersFixture
    email_verified: true,
    name: 'New User',
    given_name: 'New',
    family_name: 'User',
    picture: 'https://lh3.googleusercontent.com/a/new-user',
    aud: process.env.GOOGLE_CLIENT_ID || 'mock-client-id.apps.googleusercontent.com',
    iss: 'https://accounts.google.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  },

  // ==================== Token invalide (mauvais audience) ====================
  invalidAudienceTokenInfo: {
    sub: 'google-invalid-123',
    email: 'invalid@gmail.com',
    email_verified: true,
    name: 'Invalid User',
    aud: 'wrong-client-id.apps.googleusercontent.com', // ❌ Mauvais client ID
    iss: 'https://accounts.google.com',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  },

  // ==================== Token expiré ====================
  expiredTokenInfo: {
    sub: 'google-expired-123',
    email: 'expired@gmail.com',
    email_verified: true,
    name: 'Expired User',
    aud: process.env.GOOGLE_CLIENT_ID || 'mock-client-id.apps.googleusercontent.com',
    iss: 'https://accounts.google.com',
    iat: Math.floor(Date.now() / 1000) - 7200, // Il y a 2h
    exp: Math.floor(Date.now() / 1000) - 3600, // ❌ Expiré il y a 1h
  },

  // ==================== JWT généré par ton backend ====================
  generatedJwt: {
    access_token: 'mock-jwt-token-generated-by-backend',
    payload: {
      sub: '507f1f77bcf86cd799439011', // userId de MongoDB
      email: 'john.doe@gmail.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 900, // 15 minutes
    },
  },

  // ==================== Refresh token ====================
  validRefreshToken: 'mock-refresh-token-12345',
};
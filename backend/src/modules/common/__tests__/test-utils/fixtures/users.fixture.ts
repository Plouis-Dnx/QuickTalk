export const usersFixture = {
  // ==================== Utilisateurs valides ====================
  validUsers: [
    {
      _id: '507f1f77bcf86cd799439011',
      googleId: 'google-123456789',
      username: 'john_doe',
      email: 'john.doe@example.com',
      profile_picture: 'https://lh3.googleusercontent.com/a/default-user-1',
      biography: 'Software developer passionate about NestJS and testing',
      visibility: true,
      createdAt: new Date('2024-01-15T10:30:00.000Z'),
      updatedAt: new Date('2024-01-15T10:30:00.000Z'),
    },
    {
      _id: '507f1f77bcf86cd799439012',
      googleId: 'google-987654321',
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      profile_picture: 'https://lh3.googleusercontent.com/a/default-user-2',
      biography: 'Tech enthusiast | Coffee lover ☕',
      visibility: true,
      createdAt: new Date('2024-01-16T14:20:00.000Z'),
      updatedAt: new Date('2024-01-16T14:20:00.000Z'),
    },
    {
      _id: '507f1f77bcf86cd799439013',
      googleId: 'google-555444333',
      username: 'bob_wilson',
      email: 'bob.wilson@example.com',
      profile_picture: 'https://lh3.googleusercontent.com/a/default-user-3',
      biography: 'Full-stack developer exploring MongoDB',
      visibility: true,
      createdAt: new Date('2024-01-17T09:15:00.000Z'),
      updatedAt: new Date('2024-01-17T09:15:00.000Z'),
    },
    {
      _id: '507f1f77bcf86cd799439014',
      googleId: 'google-111222333',
      username: 'alice_wonder',
      email: 'alice.wonder@example.com',
      profile_picture: 'https://lh3.googleusercontent.com/a/default-user-4',
      // Pas de biography (optionnel)
      visibility: false, // Profil privé
      createdAt: new Date('2024-01-18T11:45:00.000Z'),
      updatedAt: new Date('2024-01-18T11:45:00.000Z'),
    },
    {
      _id: '507f1f77bcf86cd799439015',
      googleId: 'google-999888777',
      username: 'charlie_brown',
      email: 'charlie.brown@example.com',
      // Pas de profile_picture (optionnel)
      biography: 'Just getting started with coding!',
      visibility: true,
      createdAt: new Date('2024-01-19T16:00:00.000Z'),
      updatedAt: new Date('2024-01-19T16:00:00.000Z'),
    },
  ],

  // ==================== Un seul utilisateur valide ====================
  singleValidUser: {
    _id: '507f1f77bcf86cd799439011',
    googleId: 'google-123456789',
    username: 'john_doe',
    email: 'john.doe@example.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/default-user-1',
    biography: 'Software developer passionate about NestJS and testing',
    visibility: true,
    createdAt: new Date('2024-01-15T10:30:00.000Z'),
    updatedAt: new Date('2024-01-15T10:30:00.000Z'),
  },

  // ==================== Utilisateur avec profil minimal ====================
  minimalUser: {
    _id: '507f1f77bcf86cd799439020',
    googleId: 'google-minimal-001',
    username: 'minimal_user',
    email: 'minimal@example.com',
    // Pas de profile_picture
    // Pas de biography
    visibility: true, // Valeur par défaut
    createdAt: new Date('2024-01-20T08:00:00.000Z'),
    updatedAt: new Date('2024-01-20T08:00:00.000Z'),
  },

  // ==================== Utilisateur avec profil privé ====================
  privateUser: {
    _id: '507f1f77bcf86cd799439021',
    googleId: 'google-private-001',
    username: 'private_user',
    email: 'private@example.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/private-user',
    biography: 'I prefer to keep my profile private',
    visibility: false, // Profil privé
    createdAt: new Date('2024-01-21T12:30:00.000Z'),
    updatedAt: new Date('2024-01-21T12:30:00.000Z'),
  },

  // ==================== Utilisateurs INVALIDES (pour tester la validation) ====================
  invalidUsers: [
    {
      // Manque googleId (required)
      username: 'invalid_user_1',
      email: 'invalid1@example.com',
      visibility: true,
    },
    {
      googleId: 'google-invalid-002',
      // Manque username (required)
      email: 'invalid2@example.com',
      visibility: true,
    },
    {
      googleId: 'google-invalid-003',
      username: 'invalid_user_3',
      // Manque email (required)
      visibility: true,
    },
    {
      googleId: 'google-invalid-004',
      username: 'invalid_user_4',
      email: 'not-an-email', // Email invalide (pas de @)
      visibility: true,
    },
    {
      googleId: 'google-invalid-005',
      username: '', // Username vide
      email: 'invalid5@example.com',
      visibility: true,
    },
    {
      googleId: '', // GoogleId vide
      username: 'invalid_user_6',
      email: 'invalid6@example.com',
      visibility: true,
    },
  ],

  // ==================== Données pour créer un nouvel utilisateur ====================
  newUserData: {
    googleId: 'google-new-user-001',
    username: 'new_user',
    email: 'newuser@example.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/new-user',
    biography: 'Just joined the platform!',
    visibility: true,
  },

  // ==================== Données pour mettre à jour un utilisateur ====================
  updateUserData: {
    username: 'updated_username',
    biography: 'Updated biography text',
    visibility: false,
  },
};
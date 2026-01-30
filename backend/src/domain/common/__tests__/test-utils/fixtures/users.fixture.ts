export const usersFixture = {
  // ==================== Valid Users ====================
  validUsers: [
    {
      _id: '507f1f77bcf86cd799439011',
      googleId: 'google-123456789',
      username: 'john_doe',
      email: 'john.doe@gmail.com',
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
      email: 'jane.smith@gmail.com',
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
      email: 'bob.wilson@gmail.com',
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
      email: 'alice.wonder@gmail.com',
      profile_picture: 'https://lh3.googleusercontent.com/a/default-user-4',
      // No biography (optional)
      visibility: false, // Private profile
      createdAt: new Date('2024-01-18T11:45:00.000Z'),
      updatedAt: new Date('2024-01-18T11:45:00.000Z'),
    },
    {
      _id: '507f1f77bcf86cd799439015',
      googleId: 'google-999888777',
      username: 'charlie_brown',
      email: 'charlie.brown@gmail.com',
      // No profile_picture (optional)
      biography: 'Just getting started with coding!',
      visibility: true,
      createdAt: new Date('2024-01-19T16:00:00.000Z'),
      updatedAt: new Date('2024-01-19T16:00:00.000Z'),
    },
  ],

  // ==================== Single Valid User ====================
  singleValidUser: {
    _id: '507f1f77bcf86cd799439011',
    googleId: 'google-123456789',
    username: 'john_doe',
    email: 'john.doe@gmail.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/default-user-1',
    biography: 'Software developer passionate about NestJS and testing',
    visibility: true,
    createdAt: new Date('2024-01-15T10:30:00.000Z'),
    updatedAt: new Date('2024-01-15T10:30:00.000Z'),
  },

  // ==================== User with a minmal profile ====================
  minimalUser: {
    _id: '507f1f77bcf86cd799439020',
    googleId: 'google-minimal-001',
    username: 'minimal_user',
    email: 'minimal@gmail.com',
    // No profile_picture
    // No biography
    visibility: true, // Default value
    createdAt: new Date('2024-01-20T08:00:00.000Z'),
    updatedAt: new Date('2024-01-20T08:00:00.000Z'),
  },

  // ==================== User with a private profile ====================
  privateUser: {
    _id: '507f1f77bcf86cd799439021',
    googleId: 'google-private-001',
    username: 'private_user',
    email: 'private@gmail.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/private-user',
    biography: 'I prefer to keep my profile private',
    visibility: false, // Private profile
    createdAt: new Date('2024-01-21T12:30:00.000Z'),
    updatedAt: new Date('2024-01-21T12:30:00.000Z'),
  },

  // ==================== Invalid Users (to test validation) ====================
  invalidUsers: [
    {
      // Missing googleId (required)
      username: 'invalid_user_1',
      email: 'invalid1@gmail.com',
      visibility: true,
    },
    {
      googleId: 'google-invalid-002',
      // Missing username (required)
      email: 'invalid2@gmail.com',
      visibility: true,
    },
    {
      googleId: 'google-invalid-003',
      username: 'invalid_user_3',
      // Missing email (required)
      visibility: true,
    },
    {
      googleId: 'google-invalid-004',
      username: 'invalid_user_4',
      email: 'not-an-email', // Invalid email (no @)
      visibility: true,
    },
    {
      googleId: 'google-invalid-005',
      username: '', // Empty username
      email: 'invalid5@gmail.com',
      visibility: true,
    },
    {
      googleId: '', // Empty GoogleID
      username: 'invalid_user_6',
      email: 'invalid6@gmail.com',
      visibility: true,
    },
  ],

  // ==================== Data to create a new user ====================
  newUserData: {
    googleId: 'google-new-user-001',
    username: 'new_user',
    email: 'newuser@gmail.com',
    profile_picture: 'https://lh3.googleusercontent.com/a/new-user',
    biography: 'Just joined the platform!',
    visibility: true,
  },

  // ==================== Data to update a user ====================
  updateUserData: {
    username: 'updated_username',
    biography: 'Updated biography text',
    visibility: false,
  },
};
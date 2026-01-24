// factories/user.factory.ts
export class UserFactory {
  // Valid user
  static createValid(overrides = {}) {
    return {
      id: 1,
      email: 'valid@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'ValidPass123!',
      ...overrides,
    };
  }

  // User with invalid email
  static createWithInvalidEmail(overrides = {}) {
    return {
      id: 2,
      email: 'invalid-email', // No @
      firstName: 'Jane',
      lastName: 'Smith',
      password: 'ValidPass123!',
      ...overrides,
    };
  }

  // User with missing data
  static createWithMissingData(overrides = {}) {
    return {
      id: 3,
      email: 'test@example.com',
      // missing firstName
      lastName: 'Doe',
      ...overrides,
    };
  }
}
export const createMockJwtService = () => ({
  sign: jest.fn().mockReturnValue('fakeToken'),
  verifyAsync: jest.fn()
});
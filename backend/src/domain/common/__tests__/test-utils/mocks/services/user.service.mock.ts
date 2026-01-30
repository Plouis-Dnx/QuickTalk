export const createMockUserService = () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    getUserByEmail: jest.fn(),
    createUser: jest.fn(),
    updateUserById: jest.fn(),
    deleteUserById: jest.fn()
});
// mocks/user.repository.mock.ts
export const createMockUserRepository = () => ({
  // Simule la recherche d'un user
  findOne: jest.fn(),
  
  // Simule l'enregistrement (retourne ce qu'on lui donne)
  save: jest.fn((user) => Promise.resolve({ id: 1, ...user })),
  
  // Simule la création
  create: jest.fn((user) => user),
});
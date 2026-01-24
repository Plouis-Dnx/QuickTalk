import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../user.service'
import { getModelToken } from '@nestjs/mongoose'
import { User } from '../user.schema'
import { createMockUserModel } from '../../common/__tests__/test-utils/mocks/models/user.model.mock';
import { usersFixture } from '../../common/__tests__/test-utils/fixtures/users.fixture';

describe('UserService', () => {
    let service: UserService;
    let mockUserModel: any;

    beforeEach(async () => {
        // Create mock
        mockUserModel = createMockUserModel();

        // Create test module
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel
                }
            ]
        }).compile();

        service = module.get<UserService>(UserService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clears mocks after each test
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // =============================== GetAllUsers =============================== 

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            mockUserModel.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.validUsers)
            });

            const result = await service.getAllUsers();

            expect(result).toEqual(usersFixture.validUsers);
            expect(result).toHaveLength(5);
            expect(mockUserModel.find).toHaveBeenCalled();
        });

        it('should return an empty array when no users', async () => {
            mockUserModel.find.mockReturnValue({
                exec: jest.fn().mockResolvedValue([])
            });

            const result = await service.getAllUsers();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });
    });
});
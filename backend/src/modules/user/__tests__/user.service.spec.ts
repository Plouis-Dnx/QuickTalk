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
                UserService, // We want to test UserService
                { // Fake Database
                    provide: getModelToken(User.name), // When the User Model from Mongoose is called
                    useValue: mockUserModel // The program uses the mocked UserModel
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

    // =============================== getAllUsers =============================== 

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
            mockUserModel.find;
            const result = await service.getAllUsers();

            expect(result).toEqual([]);
            expect(result).toHaveLength(0);
        });
    });

    // =============================== getUserById ===============================
    describe('getUserById', () => {
        it('should return user when found by id', async () => {
            mockUserModel.findById.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.getUserById('507f1f77bcf86cd799439011');

            expect(mockUserModel.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
            expect(result).toEqual(usersFixture.singleValidUser);
            expect(result.email).toBe('john.doe@example.com');
            expect(result.username).toBe('john_doe');
        });

        it('should throw NotFoundException when user not found', async () => {
            mockUserModel.findById;
            await expect(service.getUserById('nonexistant-id'))
                .rejects
                .toThrow('user not found');
        });
    });

    // =============================== getUserByEmail ===============================
    describe('getUserByEmail', () => {
        it('should return user when found by email', async () => {
            mockUserModel.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.getUserByEmail('john.doe@example.com');

            expect(result).toEqual(usersFixture.singleValidUser);
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ 
                email: 'john.doe@example.com' 
            });
        });

        it('should throw NotFoundException when email not found', async () => {
            mockUserModel.findOne;
            await expect(service.getUserById('notfound@email.com'))
                .rejects
                .toThrow('user not found');
        });
    });

    // =============================== createUser ===============================
    describe('createUser', () => {
        it('should create and save a new user', async () => {
            const newUser = usersFixture.newUserData;
            const savedUser = {_id: '507f1f77bcf86cd799439099', ...newUser};

            mockUserModel.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(savedUser)
            }));

            const result = await service.createUser(newUser);

            expect(result).toEqual(savedUser);
            expect(result._id).toBeDefined();
        });

        // Case where creation did not work ??
    });

    // =============================== updateUserById ===============================
    describe('updateUserById', () => {
        it('should update and return the updated user', async () => {
            const updatedUser = {
                ...usersFixture.singleValidUser,
                ...usersFixture.updateUserData
            };

            mockUserModel.findByIdAndUpdate.mockReturnValue({
                exec: jest.fn().mockResolvedValue(updatedUser)
            });

            const result = await service.updateUserById(
                usersFixture.singleValidUser._id,
                usersFixture.updateUserData
            );

            expect(result.username).toBe('updated_username');
            expect(result.visibility).toBe(false);
            expect(result.email).toBe('john.doe@example.com');
            expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
                '507f1f77bcf86cd799439011',
                usersFixture.updateUserData,
                { new: true, runValidators: true }
            );
        });

        it('should return NotFoundException when user to update not found', async () => {
            mockUserModel.findByIdAndUpdate;
            await expect(
                service.updateUserById('nonexistant-id', usersFixture.updateUserData)
            ).rejects.toThrow('user not found');
        });
    });

    // =============================== deleteUserById ===============================
    describe('deleteUserById', () => {
        it('should delete and return the deleted user', async () => {
            mockUserModel.findByIdAndDelete.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.deleteUserById('507f1f77bcf86cd799439011');

            expect(result).toEqual(usersFixture.singleValidUser);
            expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
        });

        it('should throw NotFoundException when user to delete not found', async () => {
            mockUserModel.findByIdAndDelete;
            await expect(service.deleteUserById('nonexistent-id'))
                .rejects
                .toThrow('user not found');
        });
    });
});
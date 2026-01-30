import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { UserService } from '../user.service';
import { User } from '../user.schema';

// User Model Mock
import { createMockUserModel } from '../../common/__tests__/test-utils/mocks/models/user.model.mock';

// User Fixtures
import { usersFixture } from '../../common/__tests__/test-utils/fixtures/users.fixture';

describe('UserService', () => {
    let service: UserService;
    let mockUserModel: any;

    beforeEach(async () => {
        mockUserModel = createMockUserModel();

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
        jest.clearAllMocks();
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
            expect(result).toHaveLength(usersFixture.validUsers.length);
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

    // =============================== getUserById ===============================
    describe('getUserById', () => {
        it('should return user when found by id', async () => {
            mockUserModel.findById.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.getUserById(usersFixture.singleValidUser._id);

            expect(mockUserModel.findById).toHaveBeenCalledWith(usersFixture.singleValidUser._id);
            expect(result).toEqual(usersFixture.singleValidUser);
        });

        it('should throw NotFoundException when user not found', async () => {
            mockUserModel.findById.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            });

            await expect(service.getUserById('nonexistent-id'))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    // =============================== getUserByEmail ===============================
    describe('getUserByEmail', () => {
        it('should return user when found by email', async () => {
            mockUserModel.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.getUserByEmail(usersFixture.singleValidUser.email);

            expect(result).toEqual(usersFixture.singleValidUser);
            expect(mockUserModel.findOne).toHaveBeenCalledWith({ 
                email: usersFixture.singleValidUser.email 
            });
        });

        it('should throw NotFoundException when email not found', async () => {
            mockUserModel.findOne.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            });

            await expect(service.getUserByEmail('notfound@email.com'))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    // =============================== createUser ===============================
    describe('createUser', () => {
        it('should create and save a new user', async () => {
            const userData = { ...usersFixture.newUserData };
            
            mockUserModel.mockImplementation((dto) => ({
                ...dto,
                save: jest.fn().mockResolvedValue({ ...dto, _id: 'mocked-id' })
            }));

            const result = await service.createUser(userData);

            expect(mockUserModel).toHaveBeenCalledWith(userData);
            expect(result).toMatchObject(userData);
            expect(result).toHaveProperty('_id');
        });
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

            expect(result.username).toBe(usersFixture.updateUserData.username);
            expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
                usersFixture.singleValidUser._id,
                usersFixture.updateUserData,
                { new: true, runValidators: true }
            );
        });

        it('should throw NotFoundException when user to update not found', async () => {
            mockUserModel.findByIdAndUpdate.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            });

            await expect(
                service.updateUserById('nonexistent-id', usersFixture.updateUserData)
            ).rejects.toThrow(NotFoundException);
        });
    });

    // =============================== deleteUserById ===============================
    describe('deleteUserById', () => {
        it('should delete and return the deleted user', async () => {
            mockUserModel.findByIdAndDelete.mockReturnValue({
                exec: jest.fn().mockResolvedValue(usersFixture.singleValidUser)
            });

            const result = await service.deleteUserById(usersFixture.singleValidUser._id);

            expect(result).toEqual(usersFixture.singleValidUser);
            expect(mockUserModel.findByIdAndDelete).toHaveBeenCalledWith(usersFixture.singleValidUser._id);
        });

        it('should throw NotFoundException when user to delete not found', async () => {
            mockUserModel.findByIdAndDelete.mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            });

            await expect(service.deleteUserById('nonexistent-id'))
                .rejects
                .toThrow(NotFoundException);
        });
    });
});
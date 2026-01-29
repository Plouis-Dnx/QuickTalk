// NestJS
import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException, ConflictException } from '@nestjs/common'

// Services
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'

// Mocks
import { createMockJwtService } from '../../common/__tests__/test-utils/mocks/services/jwt.service.mock'
import { createMockUserService } from '../../common/__tests__/test-utils/mocks/services/user.service.mock'

// Fixtures
import { googleAuthFixture } from '../../common/__tests__/test-utils/fixtures/google-auth.fixture'
import { usersFixture } from '../../common/__tests__/test-utils/fixtures/users.fixture'

describe('AuthService', () => {
    // Services
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    // Mocks
    let mockUserService: any;
    let mockJwtService: any;

    // Mock for the global fetch (when calling Google OAuth)
    const mockFetch = jest.fn();

    beforeAll(() => {
        global.fetch = mockFetch as any; // Replace global fetch by a mock
    });

    beforeEach(async () => {
        // Mocks
        mockUserService = createMockUserService();
        mockJwtService = createMockJwtService();

        // Test Module
        const module: TestingModule = await Test.createTestingModule({
            providers: [ 
                AuthService, // We want to test AuthService
                {
                    provide: UserService, // Replace UserService 
                    useValue: mockUserService // by his mock
                },
                {
                    provide: JwtService, // Same here... 
                    useValue: mockJwtService
                }
            ] 
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);

        process.env.GOOGLE_CLIENT_ID = 'mock-client-id.apps.googleusercontent.com';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        it('should successfully login a registered user with valid Google token', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.existingUserTokenInfo
            });

            // Mock UserService to return an existing user
            mockUserService.getUserByEmail.mockResolvedValueOnce(usersFixture.singleValidUser);

            // Mock JwtService to return a fake JWT
            mockJwtService.sign.mockReturnValueOnce('fake-jwt-token');

            // Call the login method
            const result = await authService.login(googleAuthFixture.validIdToken);

            // Assertions
            expect(mockFetch).toHaveBeenCalledWith(`https://oauth2.googleapis.com/tokeninfo?id_token=${googleAuthFixture.validIdToken}`);
            expect(mockJwtService.sign).toHaveBeenCalledWith({ 
                sub: usersFixture.singleValidUser._id, 
                email: usersFixture.singleValidUser.email 
            });
            expect(mockUserService.getUserByEmail).toHaveBeenCalledWith('john.doe@gmail.com');
            expect(result).toEqual({
                access_token: 'fake-jwt-token',
                user: usersFixture.singleValidUser
            });
        });

        it('should throw UnauthorizedException for unregistered user', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.newUserTokenInfo
            });

            // Mock UserService to return null (user not found)
            mockUserService.getUserByEmail.mockResolvedValueOnce(null);

            // Call the login method and expect an exception
            await expect(authService.login(googleAuthFixture.validIdToken))
                .rejects
                .toThrow(UnauthorizedException);    
        });
        
        it('should throw UnauthorizedException for invalid Google token', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: false
            });
        
            // Call the login method and expect an exception
            await expect(authService.login('invalid-token'))
                .rejects
                .toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException for token with invalid audience', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.invalidAudienceTokenInfo
            });

            // Call the login method and expect an exception
            await expect(authService.login(googleAuthFixture.validIdToken))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });

    describe('register', () => {
        it('should successfully register a new user with valid Google token', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.newUserTokenInfo
            });

            // Mock UserService to return null (user not registered)
            mockUserService.getUserByEmail.mockResolvedValueOnce(null);

            // Mock UserService to create a new user
            mockUserService.createUser.mockResolvedValueOnce(usersFixture.newUserData);

            // Mock JwtService to return a fake JWT
            mockJwtService.sign.mockReturnValueOnce('fake-jwt-token-for-new-user');

            // Call the register method
            const result = await authService.register(googleAuthFixture.validIdToken);
            
            // Assertions
            expect(mockFetch).toHaveBeenCalledWith(`https://oauth2.googleapis.com/tokeninfo?id_token=${googleAuthFixture.validIdToken}`);
            expect(mockUserService.getUserByEmail).toHaveBeenCalledWith('newuser@example.com');
            expect(mockUserService.createUser).toHaveBeenCalledWith({
                googleId: googleAuthFixture.newUserTokenInfo.sub,
                username: googleAuthFixture.newUserTokenInfo.name,
                email: googleAuthFixture.newUserTokenInfo.email,
                profile_picture: googleAuthFixture.newUserTokenInfo.picture,
                biography: '',
                visibility: true,
            });
            expect(mockJwtService.sign).toHaveBeenCalledWith({ 
                sub: usersFixture.newUserData._id,
                email: usersFixture.newUserData.email
            });
            expect(result).toEqual({
                access_token: 'fake-jwt-token-for-new-user',
                user: usersFixture.newUserData
            });
        });

        it('should throw ConflictException when trying to register an already registered user', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.existingUserTokenInfo
            });

            // Mock UserService to return an existing user
            mockUserService.getUserByEmail.mockResolvedValueOnce(usersFixture.singleValidUser);

            // Call the register method and expect an exception
            await expect(authService.register(googleAuthFixture.validIdToken))
                .rejects
                .toThrow(ConflictException);
        });

        it('should throw UnauthorizedException for invalid Google token during registration', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: false
            });
        
            // Call the register method and expect an exception
            await expect(authService.register('invalid-token'))
                .rejects
                .toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException for token with invalid audience during registration', async () => {
            // Mock the fetch response for Google token verification
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => googleAuthFixture.invalidAudienceTokenInfo
            });

            // Call the register method and expect an exception
            await expect(authService.register(googleAuthFixture.validIdToken))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });

    describe('refresh', () => {
        it('should successfully refresh access token with valid refresh token', async () => {
            // Mock JwtService to verify the refresh token
            mockJwtService.verifyAsync.mockResolvedValueOnce({
                sub: usersFixture.singleValidUser._id,
                email: usersFixture.singleValidUser.email
            });

            // Mock UserService to return the user
            mockUserService.getUserByEmail.mockResolvedValueOnce(usersFixture.singleValidUser);

            // Mock JwtService to sign a new access token
            mockJwtService.sign.mockReturnValueOnce('new-access-token-refreshed');
            
            // Call the refresh method
            const result = await authService.refresh(googleAuthFixture.validRefreshToken);

            // Assertions
            expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(googleAuthFixture.validRefreshToken);
            expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(usersFixture.singleValidUser.email);
            expect(mockJwtService.sign).toHaveBeenCalledWith(
                { sub: usersFixture.singleValidUser._id, email: usersFixture.singleValidUser.email },
                { expiresIn: '15m' }
            );
            expect(result).toEqual({ access_token: 'new-access-token-refreshed' });
        });
        
        it('should throw UnauthorizedException for invalid refresh token', async () => {
            // Mock JwtService to throw an error when verifying the refresh token
            mockJwtService.verifyAsync.mockRejectedValueOnce(new UnauthorizedException('Invalid token'));

            // Call the refresh method and expect an exception
            await expect(authService.refresh('invalid-refresh-token'))
                .rejects
                .toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if user not found during refresh', async () => {
            // Mock JwtService to verify the refresh token
            mockJwtService.verifyAsync.mockResolvedValueOnce({
                sub: 'nonexistent-user-id',
                email: 'notfound@example.com'
            });

            // Mock UserService to return null (user not found)
            mockUserService.getUserByEmail.mockResolvedValueOnce(null);

            // Call the refresh method and expect an exception
            await expect(authService.refresh(googleAuthFixture.validRefreshToken))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });

    describe('getMe', () => {
        it('should successfully retrieve user profile by email', async () => {
            // Mock UserService to return the user
            mockUserService.getUserByEmail.mockResolvedValueOnce(usersFixture.singleValidUser);
            
            // Call the getMe method
            const result = await authService.getMe(usersFixture.singleValidUser.email);

            // Assertions
            expect(mockUserService.getUserByEmail).toHaveBeenCalledWith(usersFixture.singleValidUser.email);
            expect(result).toEqual(usersFixture.singleValidUser);
        });
        
        it('should throw UnauthorizedException if user not found in getMe', async () => {
            // Mock UserService to return null (user not found)
            mockUserService.getUserByEmail.mockResolvedValueOnce(null);

            // Call the getMe method and expect an exception
            await expect(authService.getMe('notfound@example.com'))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });
});
// NestJS
import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException, ConflictException } from '@nestjs/common'

// Services
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'

// Mocks
import { createMockJwtService } from '../../../modules/common/__tests__/test-utils/mocks/services/jwt.service.mock'
import { createMockUserService } from '../../../modules/common/__tests__/test-utils/mocks/services/user.service.mock'

// Fixtures
import { googleAuthFixture } from '../../../modules/common/__tests__/test-utils/fixtures/google-auth.fixture'
import { usersFixture } from '../../../modules/common/__tests__/test-utils/fixtures/users.fixture'

describe('AuthService', () => {
    // Services
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    // Mocks
    const mockUserService = createMockUserService();
    const mockJwtService = createMockJwtService();

    // Mock for the global fetch (when calling Google OAuth)
    const mockFetch = jest.fn();

    beforeAll(() => {
        global.fetch = mockFetch as any; // Replace global fetch by a mock
    });

    beforeEach(async () => {
        // Test Module
        const module: TestingModule = await Test.createTestingModule({
            providers: [ 
                AuthService, // We want to test AuthService
                {
                    provide: UserService,
                    useValue: mockUserService
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                }
            ] 
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);

        process.env.GOOGLE_CLIENT_ID = "fake.google.client.id"
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });
});
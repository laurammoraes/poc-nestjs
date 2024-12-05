import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserService', () => {
  let service: UserService;
  let controller: UserController;
  let mockDb: any;

  beforeEach(async () => {
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'DATABASE_CONNECTION',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('validatePhoneOnDatabase', () => {
    it('should return true when phone exists', async () => {
      
      mockDb.execute.mockResolvedValueOnce([{ id: 1 }]);
      const result = await service.validatePhoneOnDatabase('19993417478');
      expect(result).toBe(true);
    });

    it('should return false when phone does not exist', async () => {
      mockDb.execute.mockResolvedValueOnce([]);
      const result = await service.validatePhoneOnDatabase('19993417478');
      expect(result).toBe(false);
    });
  });

  describe('findByPhone', () => {
    it('should return user data when found', async () => {
      const mockUser = {
        id: 1,
        name: 'Laura',
        email: 'laura@email.com',
        phone: '19993417478',
        dateOfBirth: '02091999',
        address: '',
        city: '',
        state: '',
      };
      
      mockDb.execute.mockResolvedValueOnce([mockUser]);
      
      const result = await service.findByPhone('19993417478');
      expect(result).toEqual({
        status: 200,
        data: [mockUser],
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { response } from 'express';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = {
        status: 200,
        data: [
          {
            id: 4,
            name: 'Laura',
            email: 'laurammoraes2@gmail.com',
            phone: '19993417478',
            dateOfBirth: '02091999',
            address: '',
            city: '',
            state: '',
            createdAt: '2024-12-03T21:10:14.461Z',
            updatedAt: null,
            deletedAt: null,
          },
        ],
      };

      expect(await controller.findAll(response)).toBe(result);
    });
  });
});

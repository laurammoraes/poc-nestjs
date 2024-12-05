import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUser } from './use-cases/create';
import { FindAllUsers } from './use-cases/findAll';
import { FindUserById } from './use-cases/findById';
import { RemoveUser } from './use-cases/remove';
import { UpdateUser } from './use-cases/update';
import { Response } from 'express';

describe('UserController', () => {
  let controller: UserController;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUser,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              status: 200,
              message: 'User created successfully',
            }),
          },
        },
        {
          provide: FindAllUsers,
          useValue: {
            execute: jest.fn().mockResolvedValue({
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
            }),
          },
        },
        {
          provide: FindUserById,
          useValue: {
            execute: jest.fn().mockResolvedValue({
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
            }),
          },
        },
        {
          provide: RemoveUser,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              status: 200,
              message: 'User deleted sucessfully',
            }),
          },
        },
        {
          provide: UpdateUser,
          useValue: {
            execute: jest.fn().mockResolvedValue({
              status: 200,
              message: 'User updated',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll(mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        name: 'Laura',
        email: 'laurammoraes2@gmail.com',
        phone: '19993417478',
        dateOfBirth: '02091999',
        address: '',
        city: '',
        state: ''
      };
      const result = await controller.create(createUserDto, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });


  describe('findOne', () => {
    it('should return an array of details of a user', async () => {
      const result = await controller.findOneById('4', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll(mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    it('should update a user', async () => {

      const updateUserDto = {
        name: 'Laura',
        email: 'laurammoraes2@gmail.com',
        phone: '19993417478',
        dateOfBirth: '02091999',
        address: '',
        city: '',
        state: ''
      };
      const result = await controller.update('19993417478', updateUserDto, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });


  describe('Remove', () => {
    it('should remove a user', async () => {
      const result = await controller.remove('19993417478', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });
  
});

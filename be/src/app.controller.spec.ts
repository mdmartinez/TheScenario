import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Form } from './validation';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItemDto: Form = {
        name: 'Test Name',
        email: 'test@test.com',
        age: 1,
        favoriteColor: 'red',
        interests: ['hiking'],
        comments: 'Test comment',
      };
      const expectedResult = { ...createItemDto };

      // todo: fix
      // jest.spyOn(appService, 'create').mockResolvedValue(expectedResult);

      const result = await appController.create(createItemDto);

      expect(appService.create).toHaveBeenCalledWith(createItemDto);
      expect(result).toEqual(expectedResult);
    });
  });
});

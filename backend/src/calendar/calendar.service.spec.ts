import { Test, TestingModule } from '@nestjs/testing';
import { CalendarService } from './calendar.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '@/todo/entities/todo.entity';
import { Repository } from 'typeorm';

describe('CalendarService', () => {
   let service: CalendarService;
   let todoRepository: Repository<Todo>;

   const mockTodoRepository = {
      find: jest.fn(),
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         providers: [
            CalendarService,
            {
               provide: getRepositoryToken(Todo),
               useValue: mockTodoRepository,
            },
         ],
      }).compile();

      service = module.get<CalendarService>(CalendarService);
      todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });

   describe('findAll', () => {
      it('should return formatted calendar events from todos', async () => {
         const userId = 1;
         const mockTodos = [
            {
               id: 1,
               title: 'Test Todo 1',
               description: 'Test Description 1',
               date: new Date('2025-09-10'),
               status: 'pending',
               priority: 'high',
               extra_json: {
                  end: new Date('2025-09-11'),
                  allDay: true,
                  color: '#ff0000',
                  location: 'Office',
               },
               user: { id: userId },
            },
            {
               id: 2,
               title: 'Test Todo 2',
               description: 'Test Description 2',
               date: new Date('2025-09-12'),
               status: 'done',
               priority: 'low',
               extra_json: null,
               user: { id: userId },
            },
         ];

         mockTodoRepository.find.mockResolvedValue(mockTodos);

         const result = await service.findAll(userId);

         expect(mockTodoRepository.find).toHaveBeenCalledWith({
            where: { user: { id: userId } },
         });

         expect(result).toEqual([
            {
               title: 'Test Todo 1',
               description: 'Test Description 1',
               start: new Date('2025-09-10'),
               end: new Date('2025-09-11'),
               allDay: true,
               color: '#ff0000',
               location: 'Office',
               status: 'pending',
               priority: 'high',
            },
            {
               title: 'Test Todo 2',
               description: 'Test Description 2',
               start: new Date('2025-09-12'),
               end: new Date('2025-09-12'),
               allDay: undefined,
               color: undefined,
               location: undefined,
               status: 'done',
               priority: 'low',
            },
         ]);
      });

      it('should return empty array when no todos found', async () => {
         const userId = 1;
         mockTodoRepository.find.mockResolvedValue([]);

         const result = await service.findAll(userId);

         expect(result).toEqual([]);
      });

      it('should handle todos without extra_json', async () => {
         const userId = 1;
         const mockTodos = [
            {
               id: 1,
               title: 'Simple Todo',
               description: 'Simple Description',
               date: new Date('2025-09-15'),
               status: 'in_progress',
               priority: 'medium',
               extra_json: null,
               user: { id: userId },
            },
         ];

         mockTodoRepository.find.mockResolvedValue(mockTodos);

         const result = await service.findAll(userId);

         expect(result).toEqual([
            {
               title: 'Simple Todo',
               description: 'Simple Description',
               start: new Date('2025-09-15'),
               end: new Date('2025-09-15'),
               allDay: undefined,
               color: undefined,
               location: undefined,
               status: 'in_progress',
               priority: 'medium',
            },
         ]);
      });
   });
});

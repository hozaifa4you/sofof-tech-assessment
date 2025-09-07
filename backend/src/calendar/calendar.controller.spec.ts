import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import type { AuthUserType } from '@/types/auth-user';

describe('CalendarController', () => {
   let controller: CalendarController;
   let calendarService: CalendarService;

   const mockCalendarService = {
      findAll: jest.fn(),
   };

   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         controllers: [CalendarController],
         providers: [
            {
               provide: CalendarService,
               useValue: mockCalendarService,
            },
         ],
      }).compile();

      controller = module.get<CalendarController>(CalendarController);
      calendarService = module.get<CalendarService>(CalendarService);
   });

   it('should be defined', () => {
      expect(controller).toBeDefined();
   });

   describe('findAll', () => {
      it('should return calendar events for authenticated user', async () => {
         const mockUser: AuthUserType = {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
         };

         const mockEvents = [
            {
               title: 'Test Event',
               description: 'Test Description',
               start: new Date('2025-09-10'),
               end: new Date('2025-09-11'),
               allDay: true,
               color: '#ff0000',
               location: 'Office',
               status: 'pending',
               priority: 'high',
            },
         ];

         mockCalendarService.findAll.mockResolvedValue(mockEvents);

         const result = await controller.findAll(mockUser);

         // eslint-disable-next-line @typescript-eslint/unbound-method
         expect(calendarService.findAll).toHaveBeenCalledWith(mockUser.id);
         expect(result).toEqual(mockEvents);
      });

      it('should return empty array when no events found', async () => {
         const mockUser: AuthUserType = {
            id: 2,
            name: 'Another User',
            email: 'another@example.com',
         };

         mockCalendarService.findAll.mockResolvedValue([]);

         const result = await controller.findAll(mockUser);

         // eslint-disable-next-line @typescript-eslint/unbound-method
         expect(calendarService.findAll).toHaveBeenCalledWith(mockUser.id);
         expect(result).toEqual([]);
      });
   });
});

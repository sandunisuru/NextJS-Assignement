import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService]
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(employeeController).toBeDefined();
  });

  describe('Get All Employees', () => {
    test('should return List of Employees', async () => {
      const mockEmployees = [{
        "first_name": "Henri",
        "last_name": "Rodriguez",
        "email": "Darrin_Rippin@gmail.com",
        "number": "+94771277218",
        "gender": "M",
        "id": "1",
        "photo": "https://randomuser.me/api/portraits/men/92.jpg"
      }];

      jest.spyOn(employeeService, 'getAll').mockResolvedValue(mockEmployees);
      const data = await employeeController.listAll();
      expect(data).toEqual(mockEmployees);
    })
  });


});

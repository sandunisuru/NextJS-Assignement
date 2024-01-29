import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeDto } from 'src/dto/Employee.dto'
import { EmployeeService } from './employee.service';
import { Employee } from 'src/database/schemas/employee.schema';
import { ResponseDto } from 'src/dto/response.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Get()
    @ApiOperation({ summary: "Getting all the employees in the system" })
    @ApiOkResponse({ status: 200, type: Employee, isArray: true })
    @ApiResponse({ status: 500, description: 'Server Error!' })
    async listAll(): Promise<Employee[]> {
        return this.employeeService.getAll();
    }

    @Get(':empId')
    @ApiOperation({ summary: "Get an employee with Employee ID" })
    @ApiOkResponse({ status: 200, type: Employee })
    @ApiResponse({ status: 500, description: 'Server Error!' })
    async getEmployeeById(@Param('empId') empId: string): Promise<Employee> {
        return this.employeeService.getEmployee(empId);
    }

    @Post()
    @ApiOperation({ summary: "Create a new Employee in the system" })
    @ApiOkResponse({ status: 200, type: Employee })
    @ApiResponse({ status: 500, description: 'Server Error!' })
    async addEmployees(@Body() addEmployeeDto: EmployeeDto): Promise<Employee> {
        return this.employeeService.saveUser(addEmployeeDto);
    }

    @Put(':empId')
    @ApiOperation({ summary: "Update an existing Employee in the system" })
    @ApiOkResponse({ status: 200, type: Employee })
    @ApiResponse({ status: 500, description: 'Server Error!' })
    async updateEmployee(@Param('empId') empId: string, @Body() updateEmployeeDto: EmployeeDto): Promise<Employee> {
        return this.employeeService.updateUser(empId, updateEmployeeDto);
    }

    @Delete(':empId')
    @ApiOperation({ summary: "Delete an existing employee" })
    @ApiOkResponse({ status: 200, description: 'Employee Deleted' })
    @ApiResponse({ status: 500, description: 'Employee Delete Failed' })
    async deleteEmployee(@Param('empId') empId: string): Promise<string> {
        return this.employeeService.deleteEmployee(empId);
    }
}

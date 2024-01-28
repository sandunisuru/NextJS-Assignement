import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeeDto } from 'src/dto/Employee.dto'
import { EmployeeService } from './employee.service';
import { Employee } from 'src/database/schemas/employee.schema';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) { }

    @Get()
    async listAll(): Promise<Employee[]> {
        return this.employeeService.getAll();
    }

    @Get(':empId')
    async getEmployeeById(@Param('empId') empId: string): Promise<Employee> {
        return this.employeeService.getEmployee(empId);
    }

    @Post()
    async addEmployees(@Body() addEmployeeDto: EmployeeDto): Promise<Employee> {
        return this.employeeService.saveUser(addEmployeeDto);
    }

    @Put(':empId')
    async updateEmployee(@Param('empId') empId: string, @Body() updateEmployeeDto: EmployeeDto): Promise<Employee>{
        return this.employeeService.updateUser(empId, updateEmployeeDto);
    }

    @Delete(':empId')
    async deleteEmployee(@Param('empId') empId: string): Promise<boolean> {
        return this.employeeService.deleteEmployee(empId);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import axios from 'axios';
import { Model } from 'mongoose';
import { Employee } from 'src/database/schemas/employee.schema';
import { EmployeeDto } from 'src/dto/Employee.dto';

@Injectable()
export class EmployeeService {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) { }

    private async getNextId(): Promise<number> {
        const count = this.employeeModel.find().countDocuments();
        return count;
    }

    private async getEmployeeImage(gender: string): Promise<string> {
        const response = await axios.get(`https://randomuser.me/api?gender=${gender}`);
        return _.get(response, 'data.results.0.picture.large', _.stubString())
    }

    async getAll(): Promise<Employee[]> {
        return this.employeeModel.find().exec();
    }

    async getEmployee(empId: string): Promise<Employee> {
        return this.employeeModel.findOne({ id: empId });
    }

    async saveUser(addEmployeeDto: EmployeeDto): Promise<Employee> {
        try {
            const newEmployee: Employee = {
                ...addEmployeeDto,
                id: (await this.getNextId() + 1).toString(),
                photo: await this.getEmployeeImage(addEmployeeDto.gender == "M" ? "male" : "female")
            }
            return this.employeeModel.create(newEmployee);
        } catch (e) {
            throw e;
        }
    }

    async updateUser(empId: string, updateEmployeeDto: EmployeeDto): Promise<Employee> {
        try {
            return this.employeeModel.findOneAndUpdate({ id: empId }, {
                $set: updateEmployeeDto
            }, { new: true });
        } catch (e) {
            throw e;
        }
    }

    async deleteEmployee(empId: string): Promise<string> {
        try {
            await this.employeeModel.findOneAndDelete({ id: empId });
            return "Employee Deleted";
        } catch (e) {
            return "Employee Delete Failed";
        }
    }
}

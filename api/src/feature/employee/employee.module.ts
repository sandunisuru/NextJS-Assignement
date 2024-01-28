import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/database/schemas/employee.schema';
import { EmployeeService } from './employee.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}

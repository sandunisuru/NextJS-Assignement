import { ApiProperty } from "@nestjs/swagger";

export class EmployeeDto {
    @ApiProperty({ description: 'First name of the employee', minimum: 6, maximum: 10 })
    first_name: string;
    @ApiProperty({ description: 'Last name of the employee', minimum: 6, maximum: 10 })
    last_name: string;
    @ApiProperty({ description: 'Email of the employee' })
    email: string;
    @ApiProperty({ description: 'Phone number of the employee' })
    number: string;
    @ApiProperty({ description: 'Gender of the employee' })
    gender: string;
}
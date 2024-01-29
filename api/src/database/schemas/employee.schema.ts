import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {

    @ApiProperty()
    @Prop({ required: true })
    id: string;

    @ApiProperty()
    @Prop({ required: true })
    first_name: string;

    @ApiProperty()
    @Prop({ required: true })
    last_name: string;

    @ApiProperty()
    @Prop({ required: true })
    email: string;

    @ApiProperty()
    @Prop({ required: true })
    number: string;

    @ApiProperty()
    @Prop({ required: true })
    gender: string;

    @ApiProperty()
    @Prop({ required: true })
    photo: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    number: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    photo: string;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
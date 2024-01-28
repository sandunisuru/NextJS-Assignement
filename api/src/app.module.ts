import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './feature/employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ".env"
  }), MongooseModule.forRoot(process.env.MONGODB_URL), EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(){
    console.log(process.env.MONGODB_URL)
  }
}

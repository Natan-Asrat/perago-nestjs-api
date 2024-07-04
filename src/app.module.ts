import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nate',
      database: 'employee_db',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeeModule,
  ],
})
export class AppModule {}

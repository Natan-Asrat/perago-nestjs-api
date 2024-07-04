import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { ApiBody } from '@nestjs/swagger';
import {EmployeeDto} from './employee.dto'

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiBody({ type: EmployeeDto })
  create(@Body() employee: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Put(':id')
  @ApiBody({ type: EmployeeDto })
  update(@Param('id') id: string, @Body() employee: Partial<Employee>): Promise<Employee> {
    return this.employeeService.update(id, employee);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id/children')
  findChildren(@Param('id') id: string): Promise<Employee[]> {
    return this.employeeService.findChildren(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(id);
  }
}

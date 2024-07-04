import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(employee: Partial<Employee>): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(employee);
    return this.employeeRepository.save(newEmployee);
  }

  async update(id: string, employee: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne({ where: { id }, relations: ['parent', 'children'] });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['parent', 'children'] });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['parent', 'children'] });
  }

  async findChildren(id: string): Promise<Employee[]> {
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['children'] });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee.children;
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}

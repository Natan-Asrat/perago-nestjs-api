import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  parentId?: string;
}

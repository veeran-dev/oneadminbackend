// attendance.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean, IsDateString, IsMongoId, IsIn, IsNumber } from 'class-validator';
import { Status } from './attendance.enum';



@InputType()
export class StudentAttendance {
  @Field()
  _id: string;

  @Field()
  present: boolean;
}

@InputType()
export class AttendanceInput {

  @Field()
  instituteId: string;

  @Field()
  branchId: string;

  @Field()
  batchId: string;

  @Field()
  date: String;

  @Field(() => [StudentAttendance])
  students: StudentAttendance[];
}


@InputType()
export class AttendancePaginationInput {

  @Field()
  @IsNumber()
  limit: number

  @Field()
  @IsNumber()
  offset: number
}
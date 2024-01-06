import { ObjectType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { Status } from './attendance.enum';

@Entity()
@ObjectType()
export class Attendance {

  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  instituteId: string;

  @Column()
  @Field()
  branchId: string;

  @Column()
  @Field()
  batchId: string;

  @Column()
  @Field()
  studentId: string;

  @Column()
  @Field(() => String)
  @IsIn(Object.values(Status), { message: 'Invalid category' })
  status: Status;

  @Column()
  @Field()
  dateTime: String;
}

@Entity()
@ObjectType()
export class AttendanceWithName extends Attendance{
  @Column()
  @Field()
  fullName: string;
}

@Entity()
@ObjectType()
export class AttendanceWithBatchName extends Attendance{
  @Column()
  @Field()
  batchName: string;
}

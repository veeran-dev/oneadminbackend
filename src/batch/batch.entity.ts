import { ObjectType, Field } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { Column, Entity, ObjectIdColumn, ObjectId, OneToMany, JoinTable } from 'typeorm';

@Entity()
@ObjectType()
export class Batch {

  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  instituteId: string;

  @Column()
  @Field()
  courseId: string;

  @Column()
  @Field()
  branchId: string;

  @Column()
  @Field()
  name: string;

  @Column("string", { array: true })
  @Field(() => [String])
  staffIds: string[];

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  startTime: string;

  @Column()
  @Field()
  endTime: string;

  @Column("string", { array: true })
  @Field(() => [String])
  days: string[];

  @OneToMany(()=>Student, student=>student._id)
  students: Student[]

}


@ObjectType()
export class BatchResponse {
  @Field(() => String)
  _id: ObjectId;

  @Field()
  instituteId: string;

  @Field()
  courseId: string;

  @Field()
  branchId: string;

  @Field()
  name: string;

  @Field(() => [String])
  staffIds: string[];

  @Field()
  description: string;

  @Field()
  type: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => [String])
  days: string[];

  @Field(() => [Student])
  students: Student[];

  @Field()
  courseName: string;

  @Field()
  branchName: string;

  @Field(() => [String])
  staffName: string[];
}


@ObjectType()
export class BatchWiseAnalyticsResult {
  @Field(() => String)
  studentId: string;

  @Field(() => String)
  studentName: string;

  @Field(() => String)
  isPaid: string;

  @Field(()=>String)
  paymentDate: string;
}
// student.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsMobilePhone, IsMongoId, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class StudentInput {
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsNotEmpty({ message: 'First name cannot be empty' })
  firstName: string;

  @Field()
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  lastName: string;

  @Field()
  @IsNotEmpty({ message: 'Father name cannot be empty' })
  fatherName: string;

  @Field()
  @IsNotEmpty({ message: 'Mother name cannot be empty' })
  motherName: string;

  @Field()
  @IsNotEmpty({ message: 'School cannot be empty' })
  school: string;

  @Field()
  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  dob: string;

  @Field()
  @IsNotEmpty({ message: 'Contact 1 cannot be empty' })
  @IsMobilePhone('en-IN', { strictMode: true }, { message: 'Invalid mobile number' })
  contact1: string;

  @Field({ nullable: true })
  @IsMobilePhone('en-IN', { strictMode: true }, { message: 'Invalid mobile number' })
  contact2?: string;

  @Field()
  @IsNotEmpty({ message: 'Address line 1 cannot be empty' })
  addressLine1: string;

  @Field({ nullable: true })
  addressLine2?: string;

  @Field()
  @IsNotEmpty({ message: 'City cannot be empty' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'State cannot be empty' })
  state: string;

  @Field()
  @IsNotEmpty({ message: 'Pincode cannot be empty' })
  pincode: string;

  @Field()
  @IsNotEmpty({ message: 'Country cannot be empty' })
  country: string;
}


@InputType()
export class AddBatch{

  @Field()
  @IsNotEmpty({ message: 'Student ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Student ID' })
  studentId: string;

  @Field()
  @IsNotEmpty({ message: 'Batch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Batch ID' })
  batchId: string;

}

@InputType()
export class StudentsByBranch{
  @Field()
  @IsNotEmpty({ message: 'Branch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Branch ID' })
  branchId: string;

  @Field()
  @IsOptional()
  name: string;

  @Field()
  @IsOptional()
  batchName: string;

}

@InputType()
export class StudentsByBatch{
  @Field()
  @IsNotEmpty({ message: 'Batch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Batch ID' })
  batchId: string;

  @Field()
  @IsOptional()
  name: string;

  @Field()
  @IsOptional()
  batchName: string;

}


@InputType()
export class StudentsByID{
  @Field()
  @IsNotEmpty({ message: 'Student ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Student ID' })
  studentId: string;

}


@InputType()
export class StudentPaginationInput {

  @Field()
  @IsNumber()
  limit: number

  @Field()
  @IsNumber()
  offset: number
}
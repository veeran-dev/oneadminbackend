import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsIn, IsMongoId, IsOptional, minLength, IsNumber } from 'class-validator';

@InputType()
export class BatchInput {
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsNotEmpty({ message: 'Course ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Course ID' })
  courseId: string;

  @Field()
  @IsNotEmpty({ message: 'Batch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Batch ID' })
  branchId: string;

  @Field()
  @IsNotEmpty({ message: 'Batch name cannot be empty' })
  name: string;

  @Field(() => [String])
  staffIds: string[];

  @Field()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsIn(['Online','Offline','Hybrid',], { message: 'Invalid batch type' })
  type: string;

  @Field()
  @IsNotEmpty({ message: 'Start time cannot be empty' })
  startTime: string;

  @Field()
  @IsNotEmpty({ message: 'End time cannot be empty' })
  endTime: string;

  @Field(() => [String])
  @IsNotEmpty({ message: 'At least one day must be selected' })
  days: string[];
}


@InputType()
export class BatchId{
  @Field()
  @IsNotEmpty({ message: 'Batch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Batch ID' })
  batchId: string;
}


@InputType()
export class GetBatchByID{
  
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsOptional()
  name: string;

}


@InputType()
export class GetBatchByBranchID{

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'Branch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Branch ID' })
  branchId: string;

  @Field()
  @IsOptional()
  name: string;

}


@InputType()
export class GetBatchByCourseID{

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'Course ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Course ID' })
  courseId: string;

  @Field()
  @IsOptional()
  name: string;

}

@InputType()
export class PaginationInput {

  @Field()
  @IsNumber()
  limit: number

  @Field()
  @IsNumber()
  offset: number
}
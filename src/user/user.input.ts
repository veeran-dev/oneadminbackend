import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsMobilePhone, IsIn, IsDefined, IsMongoId, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserInputType {

  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsOptional()
  @IsMobilePhone('en-IN', {strictMode:true}, {message:"Mobile number is invalid"})
  mobile: string;

  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsIn(['admin', 'staff'], { message: 'Invalid role' })
  role: string;
}

@InputType()
export class CreateStaffInputType {

  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsIn(['admin', 'staff'], { message: 'Invalid role' })
  role: string;

  @Field()
  @IsOptional()
  mobile: string;
}


@InputType()
export class EditUserInputType {

  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Mobile cannot be empty' })
  @IsMobilePhone('en-IN', {strictMode:true}, {message:"Mobile number is invalid"})
  mobile: string;

  @Field()
  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsIn(['admin', 'staff'], { message: 'Invalid role' })
  role: string;
}


@InputType()
export class UserFiltersInput {
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Invalid staffName' })
  staffName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Invalid batchName' })
  batchName?: string;
}

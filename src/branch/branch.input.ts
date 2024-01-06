import { InputType, Field } from '@nestjs/graphql';
import { IsMobilePhone, IsNotEmpty, IsMongoId, IsString, Matches, MaxLength } from 'class-validator';

@InputType()
export class BranchInput {

  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsNotEmpty({ message: 'Branch name cannot be empty' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'POC name cannot be empty' })
  pocName: string;

  @Field()
  @IsNotEmpty({ message: 'POC mobile cannot be empty' })
  @IsMobilePhone('en-IN', { strictMode: true }, { message: 'POC mobile number is invalid' })
  pocMobile: string;

  @Field()
  @IsNotEmpty({ message: 'Street address cannot be empty' })
  @MaxLength(240, { message: 'Street address cannot exceed 240 characters' })
  streetAddress: string;

  @Field()
  @IsNotEmpty({ message: 'City cannot be empty' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'PIN code cannot be empty' })
  @IsString({ message: 'PIN code must be a string' })
  @Matches(/^[1-9][0-9]{5}$/, {
    message: 'Invalid PIN code. It should be a 6-digit number starting with a non-zero digit.',
  })
  pincode: string;

  @Field()
  @IsNotEmpty({ message: 'State cannot be empty' })
  state: string;

  @Field()
  @IsNotEmpty({ message: 'Country cannot be empty' })
  country: string;
  
}

@InputType()
export class getBranchesById{
  @Field()
  @IsNotEmpty({ message: 'Branch ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Branch ID' })
  branchId: string;
}


@InputType()
export class getBranchesByInstituteId{
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;
}

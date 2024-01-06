// institute.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsMobilePhone, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

@InputType()
export class InstituteInput {
  @Field()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(120, { message: 'Name cannot exceed 120 characters' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'About cannot be empty' })
  @MaxLength(120, { message: 'About cannot exceed 600 characters' })
  about: string;

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

  @Field()
  @IsNotEmpty({ message: 'POC name cannot be empty' })
  @IsString({message: "POC Name cannot be numbers"})
  @MaxLength(120, { message: 'Name cannot exceed 120 characters' })
  pocName: string;

  @Field()
  @IsNotEmpty({ message: 'POC mobile cannot be empty' })
  @IsMobilePhone('en-IN', {strictMode:true}, {message:"Mobile number is invalid"})
  pocMobile: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId } from 'class-validator';


@InputType()
export class getInstituteId{
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;
}
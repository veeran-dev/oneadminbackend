// course.input.ts
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, IsUrl, IsNumber, IsPositive, IsIn, IsMongoId, IsOptional, IsString } from 'class-validator';
import { CourseCategory } from './course.enums';

@InputType()
export class CourseInput {
  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsIn(Object.values(CourseCategory), { message: 'Invalid category' })
  category: CourseCategory;

  @Field(() => [String])
  @IsOptional()
  images: string[];

  @Field()
  @IsNotEmpty({ message: 'Course name cannot be empty' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @Field()
  @IsNotEmpty({ message: 'Course duration cannot be empty' })
  duration: string;

  @Field(() => [FeatureInput], { nullable: true })
  @IsOptional()
  features?: FeatureInput[];
}

@InputType()
export class FeatureInput {
  @Field()
  @IsNotEmpty({ message: 'Feature title cannot be empty' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'Feature detail cannot be empty' })
  detail: string;
}


@InputType()
export class getInstituteID{

  @Field()
  @IsNotEmpty({ message: 'Institute ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Institute ID' })
  instituteId: string;

  @Field()
  @IsOptional()
  name: string;

}

@InputType()
export class getCourseID{

  @Field()
  @IsNotEmpty({ message: 'Course ID cannot be empty' })
  @IsMongoId({ message: 'Invalid Course ID' })
  courseId: string;

}
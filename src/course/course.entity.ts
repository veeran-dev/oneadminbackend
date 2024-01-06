import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { CourseCategory } from './course.enums';
import { IsIn } from 'class-validator';

@Entity()
@ObjectType()
export class Course {

  @ObjectIdColumn()
  @Field(() => String)
  _id: ObjectId;

  @Column()
  @Field()
  instituteId: string;

  @Column()
  @Field(() => String)
  @IsIn(Object.values(CourseCategory), { message: 'Invalid category' })
  category: CourseCategory;

  @Column()
  @Field()
  name: string;

  @Column("string", { array: true })
  @Field(() => [String])
  images: string[];

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  duration: string;

  @Column("jsonb", { array: true, default: [] })
  @Field(() => [Feature], { defaultValue: [] })
  features: Feature[];
}


@ObjectType()
class Feature {
  @Field()
  title: string;

  @Field()
  detail: string;
}
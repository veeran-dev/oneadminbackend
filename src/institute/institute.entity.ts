// institute.entity.ts
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Institute {
  
  @Field(() => String)
  @ObjectIdColumn()
  _id: ObjectId;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  about: string;

  @Field()
  @Column()
  streetAddress: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  pincode: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  pocName: string;

  @Field()
  @Column()
  pocMobile: string;

  // Add other fields as needed
}

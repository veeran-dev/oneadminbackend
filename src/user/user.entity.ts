import { Column, Entity, ObjectIdColumn, ObjectId } from "typeorm";
import { ObjectType, Field } from '@nestjs/graphql';
import { IsOptional } from "class-validator";


@Entity()
@ObjectType()
export class User{

    @Field(() => String)
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email:string;

    @Column()
    @Field()
    @IsOptional()
    mobile: string;

    @Column()
    @Field()
    instituteId: string;

    @Column()
    @Field()
    role: string;
}
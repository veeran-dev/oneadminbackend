import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class VoidResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
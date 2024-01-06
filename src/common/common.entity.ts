import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommonData {
  @Field()
  steps: number;

}


@ObjectType()
export class BatchAnalytics {
  @Field()
  batchId: string;

  @Field()
  batchName: string;

  @Field()
  presentCount: number;

  @Field()
  absentCount: number;

  @Field()
  startTime: string

  @Field()
  studentsCount: number
}

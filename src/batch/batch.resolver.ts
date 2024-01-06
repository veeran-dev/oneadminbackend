// batch.resolver.ts
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { BatchService } from './batch.service';
import { BatchId, BatchInput, GetBatchByBranchID, GetBatchByCourseID, GetBatchByID, PaginationInput } from './batch.input';
import { Batch, BatchResponse, BatchWiseAnalyticsResult } from './batch.entity';



@Resolver(() => Batch)
export class BatchResolver {
  constructor(private readonly batchService: BatchService) {}

  @Mutation(() => Batch)
  async createBatch(@Args('batchData') batchData: BatchInput): Promise<Batch> {
    return this.batchService.createBatch(batchData);
  }

  @Mutation(() => Batch)
  async editBatch(
    @Args('batchId') batchId: string,
    @Args('batchData') batchData: BatchInput,
  ): Promise<Batch> {
    return this.batchService.editBatch(batchId, batchData);
  }

  @Query(()=>Batch)
  async getBatchByID(@Args('query') data: BatchId): Promise<Batch> {
    console.log(data)
    return this.batchService.getBatchByID(data.batchId);
  }

  @Query(()=>[BatchResponse])
  async getBatchesByInstituteAndBatchName(
    @Args('query') query:GetBatchByID,
    @Args('pagination') pagination: PaginationInput
  ): Promise<BatchResponse[]>{

    const res = await this.batchService.getBatchesByInstituteAndBatchName(query.instituteId, query.name, pagination)
    return res
  }

  @Query(()=>[Batch])
  async getBatchesByBranchAndBatchName(
    @Args('query') query:GetBatchByBranchID
  ): Promise<Batch[]>{
    console.log("getBatchesByBranchAndBatchName.....")
    return await this.batchService.getBatchesByBranchAndBatchName(query.branchId, query.name)
  }


  @Query(()=>[Batch])
  async getBatchesByCourseId(
    @Args('query') query:GetBatchByCourseID
  ): Promise<Batch[]>{
    return await this.batchService.getBatchesByCourseId(query.courseId, query.name)
  }


  @Query(()=>[Batch])
  async getStaffsByCourseId(
    @Args('query') query:GetBatchByCourseID
  ): Promise<string[]>{
    const courses = await this.batchService.getBatchesByCourseId(query.courseId, query.name)
    const staffIds = courses.reduce((acc, course) => acc.concat(course.staffIds), []);
    console.log("staffIds....",staffIds)
    return staffIds;
  }


  @Query(() => [BatchWiseAnalyticsResult]) // Assuming you have a corresponding GraphQL type
  async getBatchWiseAnalytics(
    @Args('batchId') batchId: string,
    @Args('date') date: string,
  ): Promise<BatchWiseAnalyticsResult[]> {
    return this.batchService.getBatchWiseAnalytics(batchId, date);
  }


}

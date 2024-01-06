import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { BranchService } from './branch.service';
import { Branch } from './branch.entity';
import { BranchInput, getBranchesByInstituteId, getBranchesById } from './branch.input';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateBranchEvent } from './create-branch.event';

@Resolver(() => Branch)
export class BranchResolver {
  constructor(
    private readonly branchService: BranchService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Mutation(() => Branch)
  async createBranch(@Args('branchData') branchData: BranchInput): Promise<Branch> {
    return this.branchService.createBranch(branchData);
  }

  @Mutation(() => Branch)
  async editBranch(
    @Args('branchId') branchId: string,
    @Args('branchData') branchData: BranchInput,
  ): Promise<Branch> {
    return this.branchService.editBranch(branchId, branchData);
  }

  @Query(()=> [Branch])
  async getBranchesByInstituteId(
    @Args('query') query:getBranchesByInstituteId
  ): Promise<Branch[]>{
    return this.branchService.getBranchesByInstituteId(query.instituteId);
  }

  @Query(()=> Branch)
  async getBranchesById(
    @Args('query') query:getBranchesById
  ): Promise<Branch>{
    return this.branchService.getBranchesById(query.branchId);
  }

  @OnEvent('createBranch')
  async handleCreateBranchEvent(event: CreateBranchEvent) {
    const branchData = event.branchData;
    await this.branchService.createBranch(branchData);
  }

}

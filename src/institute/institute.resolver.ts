// institute.resolver.ts
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { InstituteService } from './institute.service';
import { Institute } from './institute.entity';
import { InstituteInput } from './institute.input';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateBranchEvent } from 'src/branch/create-branch.event';

@Resolver(() => Institute)
export class InstituteResolver {
  constructor(
    private readonly instituteService: InstituteService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => Institute)
  async createInstitute(@Args('instituteData') instituteData: InstituteInput): Promise<Institute> {
    const institute = await this.instituteService.createInstitute(instituteData);
    const branch ={
      instituteId: String(institute._id),
      name: "Main Branch",
      pocName: instituteData.pocName,
      pocMobile: instituteData.pocMobile,
      streetAddress: instituteData.streetAddress,
      city: instituteData.city,
      state:instituteData.state,
      country: instituteData.country,
      pincode: instituteData.pincode
    }
    this.eventEmitter.emit('createBranch', new CreateBranchEvent(branch));
    return institute
    
  }

  @Mutation(() => Institute)
  async editInstitute(
    @Args('instituteId') instituteId: string,
    @Args('instituteData') instituteData: InstituteInput,
  ): Promise<Institute> {
    return this.instituteService.editInstitute(instituteId, instituteData);
  }

  @Query(()=>Institute)
  async getInstitute(
    @Args('instituteId') instituteId: string,
  ): Promise<Institute> {
    return this.instituteService.getInstitute(instituteId)
  }
}

import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import {
  CreateStaffInputType,
  CreateUserInputType,
  EditUserInputType,
  UserFiltersInput,
} from './user.input';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { GoogleAuthGuard } from '../auth/google-oauth.guard';
import { BatchService } from 'src/batch/batch.service';
import { Batch } from 'src/batch/batch.entity';
import { EmailService } from 'src/email/email.service';
@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => BatchService)) private readonly batchService: BatchService,
    private readonly emailService: EmailService,
  ) {}

  @Query((returns) => User)
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Mutation((returns) => User)
  // @UseGuards(GoogleAuthGuard)
  async createUser(
    @Args('createUser') createUser: CreateUserInputType,
  ): Promise<User> {
    ////console.log(createUser);
    // if(createUser.role === "staff"){
    //   const to = "kochacreator@gmail.com"
    //   const subject = "You've been invited to join oneadmin";
    //   const template = 'invite';
    //   const context = { referalLink: '/x' };
    //   await this.emailService.sendEmail(to, subject, template, context)
    // }
    return this.userService.createUser(createUser);
  }

  @Mutation((returns) => User)
  // @UseGuards(GoogleAuthGuard)
  async createStaff(
    @Args('createStaff') createStaff: CreateStaffInputType,
  ): Promise<User> {
    return this.userService.createUser(createStaff);
  }

  @Mutation(() => User)
  async editUser(
    @Args('id') id: string,
    @Args('userData') data: EditUserInputType,
  ): Promise<User> {
    return this.userService.editUser(id, data);
  }

  @Query(() => [User])
  async getUsersWithFilters(
    @Args('data') data: UserFiltersInput,
  ): Promise<User[]> {
    let staffIds: string[];
    const { instituteId, batchName, staffName } = data;
    if (data.batchName) {
      const allBatches = {
        limit: 999999999,
        offset: 0,
      };
      const batches: Batch[] =
        await this.batchService.getBatchesByInstituteAndBatchName(
          instituteId,
          batchName,
          allBatches,
        );
      staffIds = batches.flatMap((batch) => batch.staffIds);
    }
    return await this.userService.getUsersWithFilters(
      instituteId,
      staffName,
      staffIds,
    );
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(GoogleAuthGuard)
  @Query(() => User)
  async getUserByEmail(@Context() context): Promise<User> {
    const user = context.req.user;
    ////console.log(context.req.user)
    return await this.userService.getUserByEmail(user.email);
  }
}

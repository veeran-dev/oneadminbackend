import { Resolver, Mutation, Args, Query, ObjectType, Field } from '@nestjs/graphql';
import { InvitationsService } from './invitation.service';
import { Invitation } from './invitation.entity';
import { VoidResponse } from 'src/types/common';
import { getInstituteId } from './invitation.input';

@Resolver('Invitation')
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Mutation(()=>VoidResponse)
  async sendInvite(
    @Args('email') email: string,
    @Args('senderUserId') senderUserId: string,
    @Args('instituteId') instituteId: string,
  ): Promise<VoidResponse> {

    await this.invitationsService.sendInvite(email, senderUserId, instituteId);
    return {
      success: true,
      message: "mail sent" 
    }
  }

  @Query(()=>[Invitation])
  async getInvitationById(
    @Args('query') query:getInstituteId
  ): Promise<Invitation[]> {
    console.log("getInvitationById....",query.instituteId)
    const invitation = await this.invitationsService.getInvitations(query.instituteId);
    if(!invitation){
      return null
    }
    return invitation
  }

  
}
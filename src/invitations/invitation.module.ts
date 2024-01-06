import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsService } from './invitation.service';
import { InvitationsResolver } from './invitation.resolver';
import { Invitation } from './invitation.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), EmailModule],
  providers: [InvitationsService, InvitationsResolver],
})
export class InvitationsModule {}

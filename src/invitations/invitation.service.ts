// src/invitations/invitations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { EmailService } from '../email/email.service'; // Adjust the path based on your project structure

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    private readonly emailService: EmailService,
  ) {}

  async sendInvite(email: string, senderUserId: string, instituteId: string): Promise<void> {
    const referralCode = this.generateRandomString()

    const invitation = await this.invitationRepository.save({
      email,
      senderUserId,
      instituteId,
      referralCode,
    });

    const mailOptions = {
        to: email,
        subject: "You've been invited to join oneadmin",
        template: 'invite',
        context:{
            referalLink: `${process.env.REFERER_URL}/login?referal=${referralCode}`
        }
    };
    console.log("mailOptions .... ",mailOptions)

    // Send the email with the invite link
    await this.emailService.sendEmail(mailOptions.to, mailOptions.subject, mailOptions.template, mailOptions.context)
  }

  async getInvitations(instituteId): Promise<Invitation[]> {
    console.log("res instituteId .... ",instituteId)
    const res = await this.invitationRepository.find({ where: { instituteId } });
    console.log("res .... ",res)
    return res;
  }

  private generateRandomString() {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    const firstPart = randomString.substring(0, 3);
    const secondPart = randomString.substring(3, 6);
    const resultString = `${firstPart}-${secondPart}`;
    return resultString;
  }
}

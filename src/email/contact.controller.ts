import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendContactEmail(@Body() contactFormData: any): Promise<{ success: boolean }> {
    try {

      const { name, email, message } = contactFormData;
        console.log({ name, email, message })
      const subject = 'New Contact Form Submission';
      const template = 'contact'; // Create a handlebars template named 'contact-form.hbs'
      const to =`admin@oneadmin.in`;
      await this.emailService.sendEmail(to, subject, template, {
        name,
        email,
        message,
      });

      return { success: true };
    } catch (error:any) {
      return { success: false};
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { readFile } from 'fs/promises';
import { join } from 'path';
// import * as nodemailerExpressHandlebars from 'nodemailer-express-handlebars';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'kochacreator@gmail.com',
      pass: 'dkWyfrBEVzZHL4Mq',
    },
  });

  constructor() {}

  async sendEmail(to: string, subject: string, template: string, context: any): Promise<void> {
    const html = await this.renderTemplate(template, context);

    const info = await this.transporter.sendMail({
        from:"veeran.ambalam@gmail.com",
        to,
        subject,
        html,
    });

    this.logger.debug(`Email sent: ${info.messageId}`);
  }

  private async renderTemplate(template: string, context: any): Promise<string> {
    const filePath = join(__dirname, '..', '..', '..', '/src/email/template/', `${template}.hbs`);
    const fileContent = await readFile(filePath, 'utf-8');
    const templateFile = handlebars.compile(fileContent);
    return templateFile(context);
  }
}

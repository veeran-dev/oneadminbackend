import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [],
  controllers: [ContactController],
  providers: [EmailService],
  exports: [EmailService], // Export the EmailService to make it accessible in other modules
})
export class EmailModule {}

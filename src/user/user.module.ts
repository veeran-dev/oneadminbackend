import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InstituteModule } from 'src/institute/institute.module';
import { BatchModule } from 'src/batch/batch.module';
import { EmailModule } from 'src/email/email.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        InstituteModule,
        forwardRef(() => BatchModule),
        EmailModule
    ],
    providers: [UserResolver, UserService],
    exports: [UserService],
})
export class UserModule {}

import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CourseModule } from './course/course.module';
import { InstituteModule } from './institute/institute.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { BatchModule } from './batch/batch.module';
import { AttendanceModule } from './attendance/attendance.module';
import { BranchModule } from './branch/branch.module';
import { InvitationsModule } from './invitations/invitation.module';
import { PaymentModule } from './payment/payment.module';
import { ContactController } from './email/contact.controller';
import { EmailModule } from './email/email.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    CourseModule,
    InstituteModule,
    UserModule,
    StudentModule,
    BatchModule,
    AttendanceModule,
    BranchModule,
    InvitationsModule,
    PaymentModule,
    EmailModule,
    CommonModule
  ],
  controllers: [AppController, ContactController],
  providers: [AppService],
})

export class AppModule {}
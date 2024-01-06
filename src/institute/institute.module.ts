import { Module } from '@nestjs/common';
import { InstituteResolver } from './institute.resolver';
import { InstituteService } from './institute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institute } from './institute.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        TypeOrmModule.forFeature([Institute]),
        EventEmitterModule.forRoot(),
    ],
    providers: [InstituteResolver, InstituteService],
    exports: [InstituteService]
})
export class InstituteModule {}

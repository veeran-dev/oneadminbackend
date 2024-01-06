import { Module } from '@nestjs/common';
import { BranchResolver } from './branch.resolver';
import { BranchService } from './branch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { InstituteModule } from 'src/institute/institute.module';
import { EventService } from 'src/event/event.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        TypeOrmModule.forFeature([Branch]),
        InstituteModule,
        EventEmitterModule.forRoot(),

    ],
    providers: [BranchResolver, BranchService, EventService],
    exports: [BranchService]
})

export class BranchModule {
    constructor(private readonly eventService: EventService) {
      this.listenToEvents();
    }
  
    private listenToEvents() {
        this.eventService.branchCreated.on('branchCreated', (branchId: string) => {
            console.log(`Branch created with ID: ${branchId}`);
        });
    }
  }

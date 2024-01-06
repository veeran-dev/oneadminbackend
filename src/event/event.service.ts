// event.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class EventService {
  readonly branchCreated = new EventEmitter();

  emitBranchCreated(branchId: string) {
    this.branchCreated.emit(branchId);
  }
}

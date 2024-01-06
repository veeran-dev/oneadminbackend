import { BranchInput } from "./branch.input";


export class CreateBranchEvent {
  constructor(public branchData: BranchInput) {}
}

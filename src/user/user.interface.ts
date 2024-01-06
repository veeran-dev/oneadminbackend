import { User } from "./user.entity";
import { CreateUserInputType } from "./user.input";


export interface UserServiceInterface {
    getUser(id: string): Promise<User>;
    createUser(payload: Partial<CreateUserInputType>): Promise<User>;
    editUser(id: string, userData: Partial<User>): Promise<User>;
    getUsersWithFilters(instituteId: string, staffName: string, staffIds: string[]): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
}
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    update(data: User): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    listAll(): Promise<User[]>;
}

export { IUsersRepository };
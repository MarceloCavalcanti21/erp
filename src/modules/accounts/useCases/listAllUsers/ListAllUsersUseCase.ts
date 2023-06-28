import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from '@modules/accounts/infra/typeorm/entities/User';


@injectable()
class ListAllUsersUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    
    async execute(): Promise<User[]> {
        const users = await this.usersRepository.listAll();

        return users;
    }
}

export { ListAllUsersUseCase };
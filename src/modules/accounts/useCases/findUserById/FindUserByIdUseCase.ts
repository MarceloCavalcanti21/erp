import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import AppError from '@shared/errors/AppError';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IFindUserById {
    id: string;
}


@injectable()
class FindUserByIdUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    
    async execute({
        id,
    }: IFindUserById): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) throw new AppError('Usuário não encontrado.', 404)

        delete user.password;

        return user;
    }
}

export { FindUserByIdUseCase };
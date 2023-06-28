import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';
import { ICreateAddressDTO } from '@modules/address/dtos/ICreateAddressDTO';

import AppError from '@shared/errors/AppError';

interface ICreateUser {
    name: string;
    email: string;
    password: string;
    address: ICreateAddressDTO;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AddressRepository')
        private addressRepository: IAddressRepository
    ) {}
    
    async execute({ 
        name,
        email,
        password,
        address,
     }: ICreateUser): Promise<void> {
        const {
            id,
            cep,
            state,
            city,
            number,
        } = address;

        const userAlreadyExistis = await this.usersRepository.findByEmail(email);

        if (userAlreadyExistis) {
            throw new AppError('E-mail já cadastrado');
        }

        await this.addressRepository.create({
            id,
            cep,
            state,
            city,
            number,
         });

        const passwordHash = await hash(password, 8);
    
        await this.usersRepository.create({ 
            name,
            email,
            password: passwordHash,
            address_id: id,
         });
    }
}

export { CreateUserUseCase };
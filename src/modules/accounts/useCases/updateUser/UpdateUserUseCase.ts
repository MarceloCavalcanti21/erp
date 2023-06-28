import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';

import AppError from '@shared/errors/AppError';

interface Address {
    cep: string;
    state: string;
    city: string;
    number: string;
}

interface IUpdateUser {
    userId: string;
    name: string;
    email: string;
    password: string;
    address: Address;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('AddressRepository')
        private addressRepository: IAddressRepository
    ) {}
    
    async execute({ 
        userId,
        name,
        email,
        password,
        address,
     }: IUpdateUser): Promise<void> {

        const {
            cep,
            state,
            city,
            number,
        } = address;

        const user = await this.usersRepository.findById(userId);

        if (!user) throw new AppError ('Usuário não encontrado.', 401)

        user.name = name;
        user.email = email;
        user.password = await hash(password, 8);
    
        await this.usersRepository.update(user);

        const userAddress = await this.addressRepository.findById(user.address_id)

        if (!userAddress) throw new AppError ('Endereço não encontrado.', 401)

        userAddress.cep = cep;
        userAddress.state = state;
        userAddress.city = city;
        userAddress.number = number;

        await this.addressRepository.update(userAddress);
    }
}

export { UpdateUserUseCase };
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ 
        name,
        email,
        password,
        address_id,
     }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            address_id,
        })

        await this.repository.save(user);
    }

    async update(data: User): Promise<void> {
        await this.repository.save(data);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { id },
        });

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: { email },
        });

        return user;
    }

    async listAll(): Promise<User[]> {
        const user = await this.repository.find({
            select: ['id', 'name', 'email'],
            relations: ['address']
        });

        return user;
    }
}

export { UsersRepository };
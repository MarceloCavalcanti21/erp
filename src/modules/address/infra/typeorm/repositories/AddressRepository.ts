import { getRepository, Repository } from "typeorm";
import { ICreateAddressDTO } from "@modules/address/dtos/ICreateAddressDTO";
import { IAddressRepository } from "@modules/address/repositories/IAddressRepository";
import { Address } from "../entities/Address";

class AddressRepository implements IAddressRepository {
    private repository: Repository<Address>;

    constructor() {
        this.repository = getRepository(Address);
    }

    async create({ 
        id,
        cep,
        state,
        city,
        number,
     }: ICreateAddressDTO): Promise<void> {
        const address = this.repository.create({
            id,
            cep,
            state,
            city,
            number,
        })

        await this.repository.save(address);
    }

    async update(data: Address): Promise<void> {
        await this.repository.save(data);
    }

    async findById(id: string): Promise<Address> {
        const address = await this.repository.findOne({
            where: { id },
        });

        return address;
    }
}

export { AddressRepository };
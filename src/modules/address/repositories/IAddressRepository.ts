import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../infra/typeorm/entities/Address";

interface IAddressRepository {
    create(data: ICreateAddressDTO): Promise<void>;
    update(data: Address): Promise<void>;
    findById(id: string): Promise<Address>;
}

export { IAddressRepository };
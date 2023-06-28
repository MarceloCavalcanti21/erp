import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Products } from "../infra/typeorm/entities/Products";

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<void>;
    listUserProducts(userId: string): Promise<Products[]>;
    findById(productId: string): Promise<Products>;
    findProductsByUser(userId: string): Promise<Products[]>;
    update(data: Products): Promise<void>;
}

export { IProductsRepository };
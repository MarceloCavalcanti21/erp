import { getRepository, Repository } from "typeorm";
import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { Products } from "../entities/Products";


class ProductsRepository implements IProductsRepository {
    private repository: Repository<Products>;

    constructor() {
        this.repository = getRepository(Products);
    }

    async create({ 
        name,
        price,
        description,
        image,
        user_id,
     }: ICreateProductDTO): Promise<void> {
        const product = this.repository.create({
            name,
            price,
            description,
            image,
            user_id,
        })

        await this.repository.save(product);
    }

    async listUserProducts(userId: string): Promise<Products[]> {
        const products = await this.repository.find({
            where: { user_id: userId },
        })

        return products;
    }

    async findById(productId: string): Promise<Products> {
        const product = await this.repository.findOne({
            where: { id: productId },
        })

        return product;
    }

    async findProductsByUser(userId: string): Promise<Products[]> {
        const products = await this.repository.find({
            where: { user_id: userId },
        })

        return products;
    }

    async update(data: Products): Promise<void> {
        await this.repository.save(data);
    }
}

export { ProductsRepository };
import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

import { Products } from '@modules/products/infra/typeorm/entities/Products';

interface IRequest {
    userId: string;
}

@injectable()
class FindProductsByUserUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) {}
    
    async execute({ userId }: IRequest): Promise<Products[]> {
        const products = await this.productsRepository.findProductsByUser(userId);

        return products;
    }
}

export { FindProductsByUserUseCase };
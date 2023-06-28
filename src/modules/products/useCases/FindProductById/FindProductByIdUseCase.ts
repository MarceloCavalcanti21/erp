import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { Products } from '@modules/products/infra/typeorm/entities/Products';

import AppError from '@shared/errors/AppError';

interface IRequest {
    productId: string;
}

@injectable()
class FindProductByIdUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) {}
    
    async execute({ productId }: IRequest): Promise<Products> {
        const product = await this.productsRepository.findById(productId);

        if (!product) throw new AppError('Esse produto não foi encontrado.', 401)

        return product;
    }
}

export { FindProductByIdUseCase };
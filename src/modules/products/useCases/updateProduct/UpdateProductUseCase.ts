import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { deleteFile } from '@utils/file';

import AppError from '@shared/errors/AppError';

interface IRequest {
    productId: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

@injectable()
class UpdateProductUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) {}
    
    async execute({
        productId,
        name,
        price,
        description,
        image,
     }: IRequest): Promise<void> {
        const product = await this.productsRepository.findById(productId);

        if (!product) throw new AppError('Esse produto não foi encontrado.', 401);

        await deleteFile(`./images/products/${product.image}`)

        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        
        await this.productsRepository.update(product);
    }
}

export { UpdateProductUseCase };
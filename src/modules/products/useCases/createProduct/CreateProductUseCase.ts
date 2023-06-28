import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

interface IRequest {
    name: string;
    price: number;
    description: string;
    image: string;
    user_id: string;
}

@injectable()
class CreateProductUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) {}
    
    async execute({
        name,
        price,
        description,
        image,
        user_id,
     }: IRequest): Promise<void> {
        
        await this.productsRepository.create({
            name,
            price,
            description,
            image,
            user_id,
         });
    }
}

export { CreateProductUseCase };
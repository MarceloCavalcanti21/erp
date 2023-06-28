import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            price,
            description,
         } = request.body;

        const { id } = request.params;

         const image = request.file.filename;

        const updateProductUseCase = container.resolve(UpdateProductUseCase);

        await updateProductUseCase.execute({
            productId: id,
            name,
            price,
            description,
            image,
         });
    
        return response.status(201).send();
    }
}

export { UpdateProductController };
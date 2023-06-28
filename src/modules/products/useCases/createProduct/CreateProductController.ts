import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            price,
            description,
         } = request.body;

         const image = request.file.filename;

        const createProductUseCase = container.resolve(CreateProductUseCase);

        await createProductUseCase.execute({
            name,
            price,
            description,
            image,
            user_id: request.user.id
         });
    
        return response.status(201).send();
    }
}

export { CreateProductController };
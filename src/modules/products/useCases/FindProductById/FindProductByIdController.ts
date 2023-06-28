import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindProductByIdUseCase } from './FindProductByIdUseCase';

class FindProductByIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findProductByIdUseCase = container.resolve(FindProductByIdUseCase);

        const all = await findProductByIdUseCase.execute({
            productId: id
         });
    
        return response.json(all);
    }
}

export { FindProductByIdController };
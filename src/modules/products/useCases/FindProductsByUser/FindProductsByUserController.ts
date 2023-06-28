import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindProductsByUserUseCase } from './FindProductsByUserUseCase';

class FindProductsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findProductsByUserUseCase = container.resolve(FindProductsByUserUseCase);

        const all = await findProductsByUserUseCase.execute({
            userId: id
         });
    
        return response.json(all);
    }
}

export { FindProductsByUserController };
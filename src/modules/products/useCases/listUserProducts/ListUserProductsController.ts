import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserProductsUseCase } from './ListUserProductsUseCase';

class ListUserProductsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUserProductsUseCase = container.resolve(ListUserProductsUseCase);

        const all = await listUserProductsUseCase.execute({
            userId: request.user.id
         });
    
        return response.json(all);
    }
}

export { ListUserProductsController };
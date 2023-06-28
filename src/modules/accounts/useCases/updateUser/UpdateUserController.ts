import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
        } = request.params;

        const { 
            name,
            email,
            password,
            cep,
            state,
            city,
            number,
         } = request.body;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        await updateUserUseCase.execute({ 
            userId: id,
            name,
            email,
            password,
            address: {
                cep,
                state,
                city,
                number,
            }
         });
    
        return response.status(201).send();
    }
}

export { UpdateUserController };
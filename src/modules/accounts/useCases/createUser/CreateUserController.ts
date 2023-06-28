import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            name,
            email,
            password,
            cep,
            state,
            city,
            number,
         } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({ 
            name,
            email,
            password,
            address: {
                id: uuid(),
                cep,
                state,
                city,
                number,
            }
         });
    
        return response.status(201).send();
    }
}

export { CreateUserController };
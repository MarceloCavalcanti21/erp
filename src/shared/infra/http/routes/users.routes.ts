import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';

import { ListAllUsersController } from '@modules/accounts/useCases/listAllUsers/ListAllUsersController';
import { FindUserByIdController } from '@modules/accounts/useCases/findUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

const usersRoutes = Router();

const listAllUsersController = new ListAllUsersController();
const findUserByIdController = new FindUserByIdController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

usersRoutes.get('/', ensureAuthenticated, listAllUsersController.handle);
usersRoutes.get('/:id', ensureAuthenticated, findUserByIdController.handle);
usersRoutes.post('/', createUserController.handle);
usersRoutes.put('/:id', ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
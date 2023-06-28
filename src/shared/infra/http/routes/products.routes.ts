import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { ListUserProductsController } from '@modules/products/useCases/listUserProducts/ListUserProductsController';
import { FindProductByIdController } from '@modules/products/useCases/FindProductById/FindProductByIdController';
import { FindProductsByUserController } from '@modules/products/useCases/FindProductsByUser/FindProductsByUserController';
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController';

const uploadImage = multer(uploadConfig.upload('./images/products'));

const productsRoutes = Router();
productsRoutes.use(ensureAuthenticated);

const createProductController = new CreateProductController();
const listUserProductsController = new ListUserProductsController();
const findProductByIdController = new FindProductByIdController();
const findProductsByUserController = new FindProductsByUserController();
const updateProductController = new UpdateProductController();

productsRoutes.post('/', uploadImage.single('image'), createProductController.handle);
productsRoutes.get('/', listUserProductsController.handle);
productsRoutes.get('/:id', findProductByIdController.handle);
productsRoutes.get('/user/:id', findProductsByUserController.handle);
productsRoutes.put('/:id', uploadImage.single('image'), updateProductController.handle);


export { productsRoutes };
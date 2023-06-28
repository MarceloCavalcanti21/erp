import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import createConnection from '@shared/infra/typeorm';
import '@shared/infra/typeorm';

import '@shared/container';

import { router } from './routes';
import AppError from "@shared/errors/AppError";

const app = express();

app.use(express.json());

app.use(router);

createConnection();

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Erro interno do servidor - ${err.message}`
    })
})

app.listen(3333, () => {
    console.log('Servidor iniciado na porta 3333');
});
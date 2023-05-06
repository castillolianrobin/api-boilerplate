import express, { type Router } from 'express';
import multer from 'multer';
import { CRUDController } from '../controllers/Api.contoller';

/**
 * Generate CRUD Routes based on controller
 * <multer> - used for handling form data request
 */
export function generateAPIResource<T extends CRUDController>(controller: T, router = express.Router()): Router {
  return router
    .get('/', controller.index)
    .get('/:id', controller.show)
    .post('/', multer().none(), controller.create)
    .post('/:id/edit', multer().none(), controller.update)
    .delete('/:id/delete', controller.delete);
}
import express, { Router } from 'express';
import multer from 'multer';
import { APIController } from '../User/controllers/Api.contoller';

/**
 * Generate CRUD Routes based on controller
 * <multer> - used for handling form data request
 */
export function generateAPIResource<T extends APIController>(controller: T): Router {
  return express
    .Router()
    .get('/', controller.index)
    .get('/:id', controller.show)
    .post('/', multer().none(), controller.create)
    .post('/:id/edit', multer().none(), controller.update)
    .delete('/:id/delete', controller.delete);
}
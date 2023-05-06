import { Request, Response } from 'express';
import getOrm from '../services/mikro-orm/orm';
import { STATUS } from '../constants';
import { logger } from '../services/winston/errorLogger';

export abstract class APIController {
  protected async json(res: Response, data: any, status:number = STATUS.SUCCESS.CODE): Promise<void> {
    res.status(status).json(data);
  }

  protected async error(res: Response, message: string|string[] = STATUS.BAD_REQUEST.MESSAGE, data?: any, status:number = STATUS.BAD_REQUEST.CODE ): Promise<void> {
    logger.error(
      Array.isArray(message) ? message.join(', ') : message, 
      [new Date().toISOString(), data]
    );
    res.status(status).json({ error: { message, data } });
  }

  protected async success(res: Response, message:string = STATUS.SUCCESS.MESSAGE, data?:any, status:number = STATUS.SUCCESS.CODE): Promise<void> {
    res.status(status).json({ success: { message, data } });
  }

  async orm() {
    const orm = await getOrm();
    return orm.em.fork();    
  }
}

export abstract class CRUDController extends APIController {
  index = async (req: Request<any>, res: Response) => {
    this.error(res, 'This API endpoint does not exist', {}, STATUS.NOT_FOUND.CODE);
  }
  show = async (req: Request<any>, res: Response) => {
    this.error(res, 'This API endpoint does not exist', {}, STATUS.NOT_FOUND.CODE);
  }
  create = async (req: Request<any>, res: Response) => {
    this.error(res, 'This API endpoint does not exist', {}, STATUS.NOT_FOUND.CODE);
  }
  update = async (req: Request<any>, res: Response) => {
    this.error(res, 'This API endpoint does not exist', {}, STATUS.NOT_FOUND.CODE);
  }
  delete = async (req: Request<any>, res: Response) => {
    this.error(res, 'This API endpoint does not exist', {}, STATUS.NOT_FOUND.CODE );
  }
}

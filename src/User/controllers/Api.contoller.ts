import { Request, Response } from 'express';
import getOrm from '../../orm';

export abstract class APIController {
  protected async json(res: Response, data: any, status = 200): Promise<void> {
    res.status(status).json(data);
  }

  protected async error(res: Response, message: string, status = 400): Promise<void> {
    res.status(status).json({ error: message });
  }

  protected async success(res: Response, message: string, status = 200): Promise<void> {
    res.status(status).json({ message });
  }

  async orm() {
    const orm = await getOrm();
    return orm.em.fork();    
  }

  index = async (req: Request, res: Response) => {
    this.error(res, 'This API endpoint does not exist', 404 );
  }
  show = async (req: Request, res: Response) => {
    this.error(res, 'This API endpoint does not exist', 404 );
  }
  create = async (req: Request, res: Response) => {
    this.error(res, 'This API endpoint does not exist', 404 );
  }
  update = async (req: Request, res: Response) => {
    this.error(res, 'This API endpoint does not exist', 404 );
  }
  delete = async (req: Request, res: Response) => {
    this.error(res, 'This API endpoint does not exist', 404 );
  }
}

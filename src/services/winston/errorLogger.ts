import winston from 'winston';
import path from 'path';
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const logFolder = path.join(__dirname, '.', 'logs'); // replace with your desired folder path

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ 
      filename: path.join(logFolder, `info.log`),
    }),
    new winston.transports.File({ 
      filename: path.join(logFolder, `errors.log`),
      level: 'error',
    }),
  ],
});

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Logged to ' + path.join(logFolder, `error-${new Date().toISOString()}.log`))
  logger.error(err.message, err);
  res.status(500).send('Something went wrong');
};
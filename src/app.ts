import 'dotenv/config';
// Core
import express from 'express';
import cors from 'cors';
import router from './router';
// Services 
import './services/passport/localStrategy';
import { errorHandler, logger } from './services/winston/errorLogger';
import { STATUS } from './constants';

(async () => {
  const app = express();
  const PORT = process.env.APP_PORT || '8081';
  
  // CORS: * Enabled
  app.use(cors({ origin: '*' }));

  //parse incoming requests data;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // Error Logger
  app.use(errorHandler);

  // Initialize All Routers
  router(app);

  //default catch-all route that sends a JSON response.
  app.get("*", (req, res) => {
    logger.error('404', { url: req.url, body: req.body, query: req.query });
    res.status(404).json({ 
      message: STATUS.NOT_FOUND.MESSAGE, 
    });
  });

  
  // Runner
  app.listen(PORT, ()=> {
    console.log(`\x1b[33m --Server running at Port ${PORT} | ${process.env.NODE_ENV}-- \x1b[0m`);
  });
})();
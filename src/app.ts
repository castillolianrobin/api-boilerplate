import 'dotenv/config';
import express from 'express';
import router from './router';
import cors from 'cors';
(async () => {
  const app = express();
  const PORT = process.env.APP_PORT || '8081';
  
  // CORS: * Enabled
  app.use(cors({
    origin: '*',
  }));

  //parse incoming requests data;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Initialize All Routers
  router(app);

  //default catch-all route that sends a JSON response.
  app.get("*", (req, res) =>
    res.status(401).send({ 
      app: process.env.APP_NAME || 'app name', 
      message: "Welcome to CompAPI",
      version: '0.0.1', 
    })
  );
  
  // Runner
  app.listen(PORT, ()=> {
    console.log(`\x1b[33m --Server running at Port ${PORT}-- \x1b[0m`);
  });
})();
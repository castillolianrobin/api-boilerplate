import express from 'express';
import 'dotenv/config';

(async () => {
  const app = express();
  const PORT = process.env.APP_PORT || '8081';
  
  //parse incoming requests data;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  //default catch-all route that sends a JSON response.
  app.get("*", (req, res) =>
    res.status(401).send({ 
      message: "You're lost." 
    })
  );
  
  // Runner
  app.listen(PORT, ()=> {
    console.log(`\x1b[33m --Server running at Port ${PORT}-- \x1b[0m`);
  });
})();
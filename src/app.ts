import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './config/db';
import todoRoutes from './api/todos/routes';
import * as middleware from './lib/middleware';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(middleware.cors);
app.use('/api/v1/', todoRoutes);
app.use(middleware.handleError);
app.use(middleware.notFound);

db();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} 🚀 `);
});

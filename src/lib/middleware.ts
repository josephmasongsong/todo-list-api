import { ErrorRequestHandler, RequestHandler } from 'express';

const cors: RequestHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Cache-Control'
  );
  next();
};

const handleError: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ Error: 'Internal Error' });
};

const notFound: RequestHandler = (req, res) =>
  res.status(404).json({ Error: 'Resource Not Found' });

export { cors, handleError, notFound };

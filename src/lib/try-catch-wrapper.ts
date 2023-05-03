import { RequestHandler, Request, Response, NextFunction } from 'express';

const tryCatchWrapper =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default (requestHandlersObj: Record<string, any>) => {
  const newRequestHandlersObj = Object.assign(
    {},
    ...Object.keys(requestHandlersObj).map(k => ({
      [k]: tryCatchWrapper(requestHandlersObj[k as keyof Record<string, any>]),
    }))
  );
  return newRequestHandlersObj;
};

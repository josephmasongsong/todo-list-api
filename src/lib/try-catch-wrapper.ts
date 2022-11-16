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

export default (methodsObject: object) => {
  const newMethodsObject = Object.assign(
    {},
    ...Object.keys(methodsObject).map(k => ({
      [k]: tryCatchWrapper(methodsObject[k as keyof object]),
    }))
  );
  return newMethodsObject;
};

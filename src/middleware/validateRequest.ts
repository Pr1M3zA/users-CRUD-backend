import { validationResult } from "express-validator";
import { Request, Response } from "express";

const validateRequest = (req: Request, res: Response, next: Function) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   next();
};

export default validateRequest;
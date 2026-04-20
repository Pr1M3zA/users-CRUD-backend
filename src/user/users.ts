import { Request, Response, Router, json } from "express";
import createUserService from "./services/createUserService";
import { checkSchema } from "express-validator";
import validateRequest from "../middleware/validateRequest";
import createUserSchema from "./schema/createUserSchema";
import updateUserSchema from "./schema/updateUserSchema";
import LoginSchema from "./schema/loginSchema";
import updateUserService from "./services/updateUserService";
import deleteUserService from "./services/deleteUserService";
import getUserByIdService from "./services/getUserByIdService";
import getAllUsersService from "./services/getAllUsersService";
import loginService from "./services/loginService";


const Users = Router();
Users.use(json());


Users.get('/', async (req: Request, res: Response) => {
   const { status, ...rest } = await getAllUsersService();
   res.status(status).json(rest);
});

Users.post('/', checkSchema(createUserSchema), validateRequest, async (req: Request, res: Response) => {
   const { status, ...rest } = await createUserService(req.body);
   res.status(status).json(rest);
});

Users.put('/:id', checkSchema(updateUserSchema), validateRequest, async (req: Request, res: Response) => {
   const { id } = req.params;
   const { status, ...rest } = await updateUserService({ id: Number(id), ...req.body });
   res.status(status).json(rest);
});

Users.delete('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   const { status, ...rest } = await deleteUserService({ id: Number(id) });
   res.status(status).json(rest);
});

Users.get('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   const { status, ...rest } = await getUserByIdService({ id: Number(id) });
   res.status(status).json(rest);
});   

Users.post('/login', checkSchema(LoginSchema), validateRequest, async (req: Request, res: Response) => {
   const { status, ...rest } = await loginService(req.body);
   res.status(status).json(rest);
});

export default Users;
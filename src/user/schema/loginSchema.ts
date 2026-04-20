import { Schema } from "express-validator";

const LoginSchema: Schema = {
   email: {
      in: "body",
      isEmail: true,
      optional: false, 
      errorMessage: "Email is required and must be a valid email address"
   },
   password: {
      in: "body",
      isString: true,
      notEmpty: true,
      optional: false,
      errorMessage: "Password is required"
   },
};

export default LoginSchema;
import { Schema } from "express-validator";

const createUserSchema: Schema = {
   name: {
      in: "body",
      isString: true,
      optional: false,
      errorMessage: "Name is required and must be a string"
   },
   email: {
      in: "body",
      isEmail: true,
      optional: false,
      errorMessage: "Email is required and must be a valid email address"
   },
   password: {
      in: "body",
      isLength: { options: { min: 8 } },
      optional: false,
      errorMessage: "Password is required and must be at least 8 characters long"
   }
}

export default createUserSchema;
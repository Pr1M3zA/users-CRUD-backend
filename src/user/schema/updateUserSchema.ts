import { Schema } from "express-validator";

const updateUserSchema: Schema = {
   name: {
      in: "body",
      isString: true,
      optional: true,
      errorMessage: "Name must be a string"
   },
   email: {
      in: "body",
      isEmail: true,
      optional: true,
      errorMessage: "Email must be a valid email address"
   },
   password: {
      in: "body",
      isLength: { options: { min: 8 } },
      optional: true,
      errorMessage: "Password must be at least 8 characters long"
   },
};

export default updateUserSchema;
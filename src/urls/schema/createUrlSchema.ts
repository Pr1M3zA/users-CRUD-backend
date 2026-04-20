import { Schema } from "express-validator";

const CreateUrlSchema: Schema = {
   originalUrl: {
      in: "body",
      isURL: true,
      optional: false,
      errorMessage: "originalUrl is required and must be a valid URL"
   },
   email: {
      in: "body",
      isEmail: true,
      optional: false,
      errorMessage: "email is required and must be a valid email address"
   },
};

export default CreateUrlSchema;

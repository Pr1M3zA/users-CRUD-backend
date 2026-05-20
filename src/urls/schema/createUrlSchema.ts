import { Schema } from "express-validator";

const CreateUrlSchema: Schema = {
   originalUrl: {
      in: "body",
      isURL: true,
      optional: false,
      errorMessage: "originalUrl is required and must be a valid URL"
   },
   authorization: {
      in: "headers",
      isString: true,
      optional: false,
      errorMessage: "Authorization is required and must be a valid token"
   },
};

export default CreateUrlSchema;

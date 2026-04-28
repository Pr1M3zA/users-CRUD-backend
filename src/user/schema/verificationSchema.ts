import { Schema } from "express-validator";

const VerificationSchema: Schema = {
   email: {
      in: "body",
      isEmail: true,
      optional: false,
      normalizeEmail: { options: { gmail_remove_dots: true, gmail_remove_subaddress: true } },
      errorMessage: "Email is required and must be a valid email address"
   },
   code: {
      in: "body",
      isString: true,
      notEmpty: true,
      optional: false,
      errorMessage: "Code is required"
   },
};

export default VerificationSchema;

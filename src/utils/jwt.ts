import jwt from 'jsonwebtoken';

type GenerateJwtPayload = {
  id: number;
  version: number;
};
type GenerateJwtProps = {
  payload: GenerateJwtPayload;
};

const PRIVATE_KEY = 'Abcd1234?!';

export const generateSessionJwt = ({
  payload
}: GenerateJwtProps) => {
  return jwt.sign(payload, PRIVATE_KEY)
};

export const validateSessionJwt = (token: string) => {
  try {
    return jwt.verify(token, PRIVATE_KEY) as GenerateJwtPayload;
  } catch {
    return null;
  }
};
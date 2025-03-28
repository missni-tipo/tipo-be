import jwt from "jsonwebtoken";

export const verifyJWT = async (token: string, jwtsecret: string) => {
    return jwt.verify(token, jwtsecret);
};

export const createJWT = async (
    payload: string | object,
    jwtsecret: string,
    options: any
) => {
    return jwt.sign(payload, jwtsecret, options);
};

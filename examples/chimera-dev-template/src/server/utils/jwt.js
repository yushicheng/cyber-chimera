import jwt from "jsonwebtoken";

const privite_key = "frankleo4855";

export function sign_token(sign_message) {
  return jwt.sign(sign_message, privite_key, { expiresIn: "1d" });
};

export function verify_token(sign_token) {
  try {
    const decode_message = jwt.verify(sign_token, privite_key);
    return decode_message;
  } catch (error) {
    return false;
  };
};
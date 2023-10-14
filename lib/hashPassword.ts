import { genSalt, hash, compare } from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isNotMatch = await compare(password, hashedPassword);
  return !isNotMatch;
};

export default { hashPassword, comparePassword };

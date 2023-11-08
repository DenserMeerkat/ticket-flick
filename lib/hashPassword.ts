import { genSalt, hash, compare } from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  console.log(password, hashedPassword);
  const isMatch = await compare(password, hashedPassword);
  console.log(isMatch);
  return isMatch;
};

const hashPotato = { hashPassword, comparePassword };

export default hashPotato;

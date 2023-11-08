import { User } from "@/types/userType";
import hashPotato from "./hashPassword";

async function loginUser(
  email: string,
  password: string,
  users: User[]
): Promise<User | undefined> {
  const user = users.find((user) => user.email === email);

  if (user) {
    console.log(users, user, password);
    const passwordMatch: boolean = await hashPotato.comparePassword(
      password,
      user.password
    );
    if (passwordMatch) {
      return user;
    }
  }

  return undefined;
}

function generateUUID() {
  const crypto = window.crypto || window.Crypto;

  if (crypto) {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);

    // Set the version (4) and variant (8, 9, A, or B) bits
    buffer[6] = (buffer[6] & 0x0f) | 0x40; // Version 4
    buffer[8] = (buffer[8] & 0x3f) | 0x80; // Variant: 10

    const hexDigits = "0123456789abcdef";
    let uuid = "";

    for (let i = 0; i < 16; i++) {
      uuid += hexDigits[(buffer[i] >> 4) & 0x0f] + hexDigits[buffer[i] & 0x0f];
      if (i === 3 || i === 5 || i === 7 || i === 9) {
        uuid += "-";
      }
    }

    return uuid;
  } else {
    // Fallback for browsers without crypto.getRandomValues
    console.error("crypto.getRandomValues not available.");
    return "";
  }
}

export { loginUser, generateUUID };

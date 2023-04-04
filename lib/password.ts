import argon2 from 'argon2';

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    console.error(error);
    return false;
  }
}

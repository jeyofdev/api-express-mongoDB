import argon2 from 'argon2';
import dotenv from 'dotenv';
import { HashPasswordType } from '../@types/types';

dotenv.config();

/**
 * Hash options
 */
const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

/**
 * hash a password
 */
const hashPassword: HashPasswordType = (plainPassword) =>
  argon2.hash(plainPassword, hashOptions);

export default hashPassword;

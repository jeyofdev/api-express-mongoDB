import { RouteCallbackType, UserType } from '../@types/types/index.js';
import UserModel from '../models/user.model.js';
import {
  hashPassword,
  calculateToken,
  verifyPassword,
} from '../utils/security.js';
import { userValidation } from '../utils/validation.js';

/**
 * Signup
 */
export const signup: RouteCallbackType = async (req, res) => {
  const { email, username, password } = req.body;

  let validationErrors: string | object | null | undefined = null;

  await UserModel.init();

  return UserModel.findOne({ email })
    .then(async (userExist) => {
      if (userExist) {
        return Promise.reject('DUPLICATE_EMAIL'); // eslint-disable-line prefer-promise-reject-errors
      }

      validationErrors = userValidation(req.body);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA'); // eslint-disable-line prefer-promise-reject-errors
      }

      return hashPassword(password).then((hashedPassword: string) => {
        const newUser = new UserModel({
          email,
          username,
          password: hashedPassword,
        });

        return newUser
          .save()
          .then((user: UserType) =>
            res.status(201).json({
              result: user,
            })
          )
          .catch((err: object) => {
            res.status(500).send({ error: 'Error saving the movie', err });
          });
      });
    })
    .catch((err) => {
      if (err === 'DUPLICATE_EMAIL') {
        res
          .status(409)
          .json({ message: 'This user is already in the database' });
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors });
      } else {
        res.status(500).send({ error: 'Error saving the user' });
      }
    });
};

/**
 * Login
 */
export const login: RouteCallbackType = async (req, res) => {
  const { email, password } = req.body;

  await UserModel.init();

  return UserModel.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return Promise.reject('INVALID_CREDENTIALS'); // eslint-disable-line prefer-promise-reject-errors
      }

      return verifyPassword(password, user.password)
        .then((passwordIsCorrect) => {
          if (!passwordIsCorrect) {
            return Promise.reject('INVALID_CREDENTIALS'); // eslint-disable-line prefer-promise-reject-errors
          }

          const token = calculateToken(email, user.id);
          res.cookie('userToken', token);

          return res.status(200).json({
            message: `The user ${user.username} is logged in`,
            token: calculateToken(user.email, user.id),
          });
        })
        .catch((err) => {
          if (err === 'INVALID_CREDENTIALS') {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
    })
    .catch((err) => {
      if (err === 'INVALID_CREDENTIALS') {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        res.status(500).send('Error saving the user');
      }
    });
};

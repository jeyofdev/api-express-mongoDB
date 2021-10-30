import { RouteCallbackType, UserType } from '../@types/types/index.js';
import UserModel from '../models/user.model.js';
import hashPassword from '../utils/security.js';
import { userValidation } from '../utils/validation.js';

/**
 * Post new user
 */
const signup: RouteCallbackType = async (req, res) => {
  const { email, password } = req.body;

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
        const newUser = new UserModel({ email, password: hashedPassword });

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

export default signup;

import { RouteCallbackType } from '../@types/types';
import { decodeToken } from '../utils/security.js';

/**
 * Check if user token exist
 */
const verifyToken: RouteCallbackType = (req: any, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('=')[1];
    const datas = decodeToken(token);
    req.userDatas = datas;
    return next();
  }

  req.userDatas = '';
  return res.status(401).json({ error: 'Unauthorized user' });
};

export default verifyToken;

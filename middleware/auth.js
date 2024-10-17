import { verifyToken } from '../services/generateToken.js';

const authenticateCookie = (cookie) => {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookie];
    if (!tokenValue) {
      return next();
    }
    try {
      const userPayload = verifyToken(tokenValue);
      req.user = userPayload;
    } catch (error) {
      res.status(500).send({ message: 'Invalid token' });
    }

    return next();
  };
};

const verifyAdmin = (cookieName) => {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookieName];
    if (!tokenValue) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }
    try {
      const userPayload = verifyToken(tokenValue);
      if (!userPayload.isAdmin) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Admin access required' });
      }
      req.user = userPayload;
      return next();
    } catch (error) {
      res.status(402).send({ message: 'Unauthorized: Invalid token' });
    }
  };
};

export { authenticateCookie, verifyAdmin };

import { verifyToken } from '../services/generateToken.js';

const authenticateCookie = (cookie) => {
  return (req, res, next) => {
    const tokenValue = req.cookies[cookie];
    // If there's no token, return 401 Unauthorized
    if (!tokenValue) {
      return res
        .status(401)
        .json({ message: 'No token provided, please log in' });
    }
    try {
      const userPayload = verifyToken(tokenValue);
      req.user = userPayload;
    } catch (error) {
      console.error('Error verifying token:', error.message);
      // Optionally, clear invalid/expired token
      res.clearCookie(cookie);
      // Clear the invalid token
      return res.status(401).json({
        message: 'Unauthorized, invalid or expired token',
      });
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

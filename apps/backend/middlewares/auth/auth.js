import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

import { UnauthorizedError } from '../error/apiError.js';

export async function authMiddleware(req, _res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new UnauthorizedError();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new UnauthorizedError();
    }

    req.user = user;
    next();
  } catch (err) {
    if (
      err.name === 'JsonWebTokenError' ||
      err.name === 'TokenExpiredError'
    ) {
      return next(
        new UnauthorizedError(err.name)
      );
    }

    next(err);
  }
}
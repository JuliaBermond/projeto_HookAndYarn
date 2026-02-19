import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {  
  NotFoundError,
} from "../middlewares/error/apiError.js";


export async function getUser(req, res, next) {
  const { username } = req.params;

  try {
    const user = await User.findOne({ userName: username })

    if (!user) {
      throw new NotFoundError();
    }

    return ApiResponse.success(res, {
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

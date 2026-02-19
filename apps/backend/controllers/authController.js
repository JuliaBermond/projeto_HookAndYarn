import {
  ConflictError,
  UnauthorizedError,
  UserCouldNotBeCreated,
} from "../middlewares/error/apiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { clearCookie, setCookie } from "../utils/CookieHandler.js";
import {
  validateEmail,
  validateLength,
  validateRequiredFields,
} from "../validation/validateInputFields.js";

export async function createUser(req, res, next) {
  try {
    const { email, password, userName } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new UserCouldNotBeCreated();
    }

    const userNameExists = await User.findOne({ userName });

    if (userNameExists) {
      throw new ConflictError(
        "This userName alredy exists. Create another one",
      );
    }

    validateRequiredFields(req.body, ["email", "password", "userName"]);
    validateEmail(email);
    validateLength("password", password, 6);
    validateLength("userName", userName, 3);

    const createdUser = await User.create({
      email,
      password,
      userName,
    });

    return ApiResponse.success(res, {
      data: createdUser,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await setCookie(res, user);

    return ApiResponse.success(res, {
      message: "Login successful",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req, res, next) {
  try {
    clearCookie(res);

    return ApiResponse.success(res, {
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const user = await User.findById(req.user._id).populate("posts");

    return ApiResponse.success(res, {
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

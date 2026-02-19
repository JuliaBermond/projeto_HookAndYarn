import  validator  from "validator";
import { BadRequestError } from "../middlewares/error/apiError.js";

export function validateEmail(email) {
  if (!validator.isEmail(email)) {
    throw new BadRequestError(
      "Email is invalid. You should pass a valid email adress",
    );
  }

  return true;
}

export function validateLength(field, value, min) {
  if (typeof value !== "string" || value.trim().length < min) {
    throw new BadRequestError(
      `${field} must be at least ${min} characters long`,
    );
  }
}

export function validateRequiredFields(obj, requiredFields = []) {
  const missingFields = requiredFields.filter((field) => {
    const value = obj[field];

    if (value === undefined || value === null) return true;
    if (typeof value === "string" && value.trim() === "") return true;

    return false;
  });

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `Missing required fields: ${missingFields.join(", ")}`,
    );
  }
}

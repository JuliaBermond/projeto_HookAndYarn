import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { SaltRounds } from "../utils/CommonConsts.js";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    userName: { type: String, required: true, unique: true, minlength: 4 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
    toObject: {
      virtuals: true,

      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

//Criação de hash de senha com bcrypt; dispara ao user.create() e user.save()
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, SaltRounds);
});

//Método de instância - comparar a senha dada pelo usuário com a sua senha hasheada; Usado para autenticação;
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);
export default User;

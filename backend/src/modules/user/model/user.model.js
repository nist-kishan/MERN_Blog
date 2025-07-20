import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5", 10);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null, select: false },
    otpExpiry: { type: Date, default: null },
    lastOtpSent: { type: Date, default: null },

    noOfBlog: { type: Number, default: 0 },
    profilePic: { type: String, default: "" },

    role: {
      type: String,
      enum: ["admin", "author", "reader"],
      default: "reader",
    },
    bio: { type: String, default: "" },
    premiumAccountId: { type: String, default: null },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: { type: [String], default: [] },
    lastLogin: { type: Date, default: null },

    isBanned: { type: Boolean, default: false },
    loginAttempts: {
      type: Number,
      default: 0,
      max: MAX_LOGIN_ATTEMPTS,
    },
    bannedAt: { type: Date, default: null },

    oauthProvider: {
      type: String,
      enum: ["google", "github", "local"],
      default: "local",
    },
    themePreference: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },

    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.methods.isPasswordMatch = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

UserSchema.virtual("isPremium").get(function () {
  return !!this.premiumAccountId;
});


const User = mongoose.model("User", UserSchema);
export default User;

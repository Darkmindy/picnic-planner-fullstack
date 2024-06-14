import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { hashStuff } from "../utility/commonAuthFunctions";

// Create the User schema
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true, // !Add required validation (Zod)
  },
  surname: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    unique: true, // Add unique constraint for email
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  isOnline: {
    type: Boolean,
    default: false, // Set default value to false
  },
});

// pre save hook
userSchema.pre("save", async function (next) {
  const user = this; // Use 'this' to access the document being saved

  try {
    // Hash the password before saving the user model
    user.password = await hashStuff(user.password.toString());
    next();
  } catch (error) {
    next(); // Pass on errors to error handling middleware
  }
});
// Create the User model
export const User = mongoose.model("User", userSchema);

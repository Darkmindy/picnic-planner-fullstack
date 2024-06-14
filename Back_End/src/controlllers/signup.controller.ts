import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { createUser, findByEmail } from "../services/user.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = req.body as { name: string; email: string; password: string };
    console.log(req.body);
    const userByEmail = await findByEmail(req.body.email);

    // Check if user exists
    if (userByEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const userCreated = await createUser(user);
    res.status(200).json({
      user: {
        _id: userCreated._id,
        name: userCreated.name,
        // surname: userCreated.surname,
        // age: userCreated.age,
        // username: userCreated.username,
        email: userCreated.email,
        isOnline: userCreated.isOnline,
      },
    });
  } catch (error) {
    return res.status(500).json("Internal server error" + error);
  }
};

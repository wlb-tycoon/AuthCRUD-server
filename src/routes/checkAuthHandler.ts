// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const findById = require("../interfaces/user");
require("dotenv").config();
import { findById } from "../interfaces/user";

async function checkAuthHandler(req: any, res: any) {
  try {
    const token: any = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : req.cookies.token;

    if (!token) {
      return res.code(401).send({ message: "Unauthorized" });
    }

    const decoded: jwt.JwtPayload = jwt.verify(
      token as string,
      process.env.JWT_SECRET as jwt.Secret
    ) as jwt.JwtPayload;
    const user = await findById(decoded.userId);

    if (!user) {
      res.code(404).send({ message: "User not found" });
    }

    return res.code(200).send({ message: "Authenticated", user });
  } catch (error) {
    console.error(error);
    return res.code(401).send({ message: "Unauthorized" });
  }
}

export default checkAuthHandler;

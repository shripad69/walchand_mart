import express from "express";
import { sendOtp } from "../controllers/registerControllers/sendOtp";
import { signup } from "../controllers/registerControllers/signup";
import { signin } from "../controllers/registerControllers/signin";
const registerRouter = express.Router();



registerRouter.post("/send-otp", sendOtp);
registerRouter.post("/signup", signup);
registerRouter.post("/signin", signin);

export default registerRouter;

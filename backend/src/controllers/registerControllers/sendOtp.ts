import { Request, Response } from "express";
import { transporter } from "../../utils/mailer";

export const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  // console.log(email);

  if (!email || !email.endsWith("@walchandsangli.ac.in")) {
    return res.status(400).json({ msg: "Only WCE college emails are allowed." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiresAt });
  // console.log(otpStore);

  try {
    await transporter.sendMail({
      from: "Walchand Mart <your_email@gmail.com>",
      to: email,
      subject: "Your OTP for Walchand Mart Signup",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    return res.status(200).json({ msg: "OTP sent to your WCE email." });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: "Failed to send OTP email." });
  }
};


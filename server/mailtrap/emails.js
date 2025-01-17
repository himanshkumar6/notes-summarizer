import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendverificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.log(`Error sending Verification`, error);
    throw new error(`Error sending verification email ${error}`);
  }
};

export const userWelcomeEmail = async (email, name) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      template_uuid: "30777650-3425-48e4-9b3f-0c0fe789008d",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Welcome Email Sent Sucessfully", response);
  } catch (error) {
    console.log(`Error sending Verification`, error);
    throw new Error(`Error sending verification email ${error}`);
  }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.log(`Error sending Verification`, error);
    throw new Error(`Error sending verification email ${error}`);
  }
};
export const sendResetSuccessEmail = async (email) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Password Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Successfully",
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log(`Error sending Verification`, error);
    return res.status(500).json({
      message: "Error: Kuch Galat Hai" || error.message,
    });
  }
};

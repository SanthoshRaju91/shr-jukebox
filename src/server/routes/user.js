import User from "../models/user";

export async function createUser({ firstname, lastname, emailAddress }) {
  try {
    const newUser = new User({ firstname, lastname, emailAddress });
    return await newUser.save();
  } catch (err) {
    throw new Error(err);
  }
}

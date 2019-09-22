import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      default: ""
    },
    lastname: {
      type: String,
      default: ""
    },
    emailAddress: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

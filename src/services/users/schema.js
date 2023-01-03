import mongoose from "mongoose"; // importo la libreria mongoose per gestire il database
import { Schema } from "mongoose"; // importo la classe Schema da mongoose per creare lo schema del database
import bcrypt from "bcrypt"; // importo la libreria bcrypt per criptare la password

const UserSchema = new Schema(
  {
    // creo lo schema del database
    name: { type: String, required: [true, "Please tell us your name!"] }, // imposto il campo name come stringa obbligatoria
    surname: { type: String, required: [true, "Please tell us your surname!"] }, // imposto il campo surname come stringa obbligatoria
    email: {
      type: String,
      required: [true, "Please tell us your email!"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please tell us your password!"],
      minlength: [8, "Password is too short!"],
    },
    role: { type: String, default:"User", enum: ["Admin", "User"] },
    refreshTokens: [{ token: { type: String } }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  if (user.isModified("password")) {
    user.password = hash;
  }
  next();
});

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    console.log(user, password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.__v;
  delete userObject.refreshTokens;
  delete userObject.createdAt;
  if (userObject.googleId === "") delete userObject.googleId;
  if (userObject.facebookId === "") delete userObject.facebookId;
  return userObject;
};

export default mongoose.model("User", UserSchema);

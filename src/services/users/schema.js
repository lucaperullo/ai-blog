import mongoose from "mongoose"; // importo la libreria mongoose per gestire il database
import { Schema } from "mongoose"; // importo la classe Schema da mongoose per creare lo schema del database
import { hashSync, genSaltSync, compareSync } from "bcrypt"; // importo la libreria bcrypt per criptare la password

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
    role: { type: String, required: true, enum: ["Admin", "User"] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save",  function (next) {
    // creo un middleware per criptare la password prima di salvarla nel database
    const user = this;
    
    user.role = "user";

    const salt = genSaltSync(10); // genero il salt per la criptazione della password con 10 round di criptazione, il salt è una stringa casuale che viene aggiunta alla password prima di essere criptata
    
    const hash =  hashSync (user.password, salt); // cripto la password con il salt generato sopra

    if (user.isModified("password")) {
        user.password = hash; // se la password è stata modificata la salvo nel database
    }
    next();
});

// define findByCredentials method on the UserSchema object (static method) 
UserSchema.statics.findByCredentials = async function (email, password) {
    // creo un metodo statico per trovare un utente nel database tramite email e password
    const user = await this.findOne
    ({ email
    }); // cerco l'utente nel database tramite email
    if(user){
        const isMatch =  compareSync(password, user.password); // se l'utente è stato trovato controllo se la password inserita corrisponde a quella salvata nel database
        if(isMatch){
            return user; // se la password è corretta ritorno l'utente
        }else{
            return null; // se la password è errata ritorno null
        }
    } else return null; // se l'utente non è stato trovato ritorno null
};

// define userSchema method toJSON 
UserSchema.methods.toJSON = function () {
    // creo un metodo per rimuovere la password dal json che viene ritornato al client
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.refreshToken;
    if (userObject.facebookId === "") delete userObject.facebookId;
  return userObject;
};



export default mongoose.model("User", UserSchema);

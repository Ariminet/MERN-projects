const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      default: 'John Doe',
      index: { unique: true },
    },
    userPassword: {
      type: String,
      required: [true, 'Password is required!'],
      minlength: [3, 'Password need to be longer!'],
    },
    userEmail: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  // hvis bruger er rettet men password ikke ændret så spring dette over ... next() betyder forlad denne middleware
  if (!user.isModified('userPassword')) return next();
  //Lav nye password
  const hashedPassword = await bcrypt.hash(user.userPassword, 10);
  //Erstat password med det krypterede password
  user.userPassword = hashedPassword;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please add user's name"],
    },
    email: {
      type: String,
      require: [true, "please add user's email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "please add user's password"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);

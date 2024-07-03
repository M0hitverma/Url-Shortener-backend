const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "urlModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports  = mongoose.model('userModel',userSchema);
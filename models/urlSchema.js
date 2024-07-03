const mongoose = require("mongoose");
const urlSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    originalUrl: {
      type: String,
      required: true,
      unique: true,
    },
    shortId: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    visitedHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("urlModel", urlSchema);

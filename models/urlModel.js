const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    redirectURL: {
      type: String,
      required: true,
      trim: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, //TTL Index to auto-delete expired URLs
    },
  },
  { timestamps: true }
);

urlSchema.index({ shortId: 1 });

const Url = mongoose.model('url', urlSchema);
module.exports = Url;

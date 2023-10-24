const { Schema, Types } = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Helper function to format the date
function dateFormat(createdAt) {
  return createdAt.toLocaleDateString();
}

module.exports = reactionSchema;

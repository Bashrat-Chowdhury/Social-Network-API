const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// virtual field for reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Helper function to format the date
function dateFormat(createdAt) {
  return createdAt.toLocaleDateString();
}

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;

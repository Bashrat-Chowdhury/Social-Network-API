const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate(["reactions"]);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const user = await User.findById(req.body.userId);

      if (user) {
        const thought = await Thought.create(req.body);

        await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } }
        );

        res.json(thought);
      }

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (thought.deletedCount === 0) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a reaction of the thought
  async addReaction(req, res) {
    console.log(req.body);

    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a reaction of the thought
  async removeReaction(req, res) {
    try {
      const thought = await thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

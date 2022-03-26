const { User, Thought } = require ("../models");


const thoughtController = {
    //create new thought for user
    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
            );
        })
        .then((userData) => {
            if (!userData) {
            return res.status(404).json({ message: 'No user with this ID but thought has been added' });
            }

            res.json({ message: 'Thought successfully created!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get all thoughts
    getThoughts(req,res){
        Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughtData) => {
          res.json(thoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    //update thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((thoughtData) => {
          if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      getThoughtById(req,res){
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thoughtData) => {
          if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          res.json(thoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      //delete thoughts
      deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughtData) => {
          if (!thoughtData) {
            return res.status(404).json({ message: 'No THOUGHTS with this ID!' });
          }
          res.json({message: `Deleted thought with the ID:${req.params.thoughtId}`})
        }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      },
      //add reaction to thoughts
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      // Delete reaction
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thoughtData) => {
            if (!thoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
}

module.exports = thoughtController;
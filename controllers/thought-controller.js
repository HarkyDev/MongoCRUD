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
    }
  
}

module.exports = thoughtController;
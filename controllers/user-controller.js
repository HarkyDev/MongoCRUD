const { User, Thought } = require ("../models");

//gather all users
const userController = {
    getUsers(req,res){
        User.find()
        .select("-__v").then((usersData) => {
            res.json(usersData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    
    //make a new user
    createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      //update a user
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((userData) => {
            if (!userData) {
              return res.status(404).json({ message: 'No USER with this ID' });
            }
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      getUser(req,res){
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No USER with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      }
}
module.exports = userController;

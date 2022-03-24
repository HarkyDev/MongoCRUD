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
    }
}

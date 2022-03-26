const router = require ('express').Router()
const { getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
 } = require ("../../controllers/user-controller")

router.route("/").get(getUsers).post(createUser)

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;

const router = require ('express').Router()
const { getUsers,
    createUser,
    getUser,
    updateUser
 } = require ("../../controllers/user-controller")

router.route("/").get(getUsers).post(createUser)

router.route('/:userId').get(getUser).put(updateUser);

module.exports = router;

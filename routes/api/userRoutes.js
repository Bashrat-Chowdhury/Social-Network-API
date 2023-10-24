const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  //updateUser
  createUserFriend,
  deleteUserFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends
router.route("/:userId/friends").post(createUserFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(deleteUserFriend);

module.exports = router;

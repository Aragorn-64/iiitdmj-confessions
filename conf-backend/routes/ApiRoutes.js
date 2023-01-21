const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  createPost, 
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/PostController');

const {
  login,
  checkAuth
} = require('../controllers/authController');

/* GET confession posts. */
router.route("/post").get(getAllPosts).post(createPost);
router.route("/post/:id").get(getPostById).put(updatePost).delete(deletePost);


// Auth route
router.post('/auth', login);

module.exports = router;

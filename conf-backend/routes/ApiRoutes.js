const express = require('express');
const router = express.Router();

const {
  getAllPosts,
  createPost, 
  getPostById,
  updatePost,
  deletePost,
  getAcceptedPosts,
  getPreviewPosts
} = require('../controllers/PostController');

const {
  login,
  checkAuth
} = require('../controllers/authController');

/* GET confession posts. */
// Auth route
router.post('/auth', login);
router.route('/post/prev').get(getPreviewPosts);
router.route('/post/ac').get(getAcceptedPosts);
// router.use(checkAuth);
router.route("/post").get(getAllPosts).post(createPost);
router.route("/post/:id").get(getPostById).put(updatePost).delete(deletePost);



module.exports = router;

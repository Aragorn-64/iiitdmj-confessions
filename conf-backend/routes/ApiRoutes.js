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
  checkAuth,
  loginJWT,
  checkAuthJWT,
  checkAdminJWT
} = require('../controllers/authController');

/* GET confession posts. */
// Auth route
router.post('/auth', loginJWT);
router.route('/post/prev').get(getPreviewPosts);
router.use(checkAuthJWT);
router.route('/post/ac').get(getAcceptedPosts);
router.use(checkAdminJWT);
router.route("/post").get(getAllPosts).post(createPost);
router.route("/post/:id").get(getPostById).put(updatePost).delete(deletePost);



module.exports = router;

const PostModel = require('../models/Post')

exports.getAllPosts = async () => {
    return await PostModel.find().sort({ createdAt: -1 });
};

exports.getAcceptedPosts = async () => {
    return await PostModel.find({ status: "accepted" }).sort({ createdAt: -1 });
};

exports.getPreviewPosts = async () => {
    return await PostModel.find({ status: "accepted" }).sort({ createdAt: -1 }).limit(3);
};

exports.createPost = async (post) => {
    return await PostModel.create(post);
};
exports.getPostById = async (id) => {
    return await PostModel.findById(id);
};

// exports.updatePost = async (id, post) => {
exports.updatePost = async (id) => {
    return await PostModel.findByIdAndUpdate(id, { status: "accepted" });
};

exports.deletePost = async (id) => {
    return await PostModel.findByIdAndDelete(id);
};
const postService = require('../services/PostServices')

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        console.log("posts" + posts);
        res.json({ data: posts, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        if(!req.body.bodyText ){
            throw new Error("Confession post body empty");
        }
        let postItem = {
            bodyText: req.body.bodyText
        }
        if(req.body.title) postItem.title = req.body.title;
        const post = await postService.createPost(postItem);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// req.params.id or req.query.id
exports.getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        // const post = await postService.updatePost(req.query.id, req.body);
        const post = await postService.updatePost(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postService.deletePost(req.params.id);
        res.json({ data: post, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
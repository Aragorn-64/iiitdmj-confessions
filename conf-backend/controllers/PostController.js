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

exports.getAcceptedPosts = async (req, res) => {
    try {
        const posts = await postService.getAcceptedPosts();
        console.log("posts" + posts);
        res.json({ data: posts, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPreviewPosts = async (req, res) => {
    let redact = (text) => {
        let output = text
        .split(" ")
        .map(word => {
            let rand = Math.random();
            // console.log(rand)
            if(rand < 0.3) return word;
            // else return "<span className='redacted'>" + "x".repeat(word.length) + "</span>";
            else return "x".repeat(word.length);
        })
        .join(" ");
        return output;
    }

    try {
        let previews = await postService.getPreviewPosts();
        let redacted = previews.map((prev) => {
            prev.bodyText = redact(prev.bodyText)
            if(prev.title) prev.title = redact(prev.title)
            return prev
        });
        console.log("redacted preview objects" + redacted);
        res.json({ data: redacted, status: "success" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }   
}

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
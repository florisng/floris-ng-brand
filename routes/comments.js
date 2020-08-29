const router = require('express').Router();
const Comment = require('../model/Comment');
const verify = require('./verifyToken');

router.post('/comments/save', verify, async (req, res) => {
    try {
        // Create a new comment
        const comment = new Comment({
            comment: req.body.comment
        });
        await comment.save();
        res.send(comment);
    } catch(err) {
        res.json(err.message);
    }
});

// Get all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch(err) {
        res.json(err.message);
    }
});

// Delete a comment
router.delete('/comments/:postId', verify, async (req, res) => {
    try {
        const deletedComment = await Comment.remove({ _id: req.params.postId });
        res.json(deletedComment);
    }catch(err) {
        res.send(err.message);
    }
});

module.exports = router;
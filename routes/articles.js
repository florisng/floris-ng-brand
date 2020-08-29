const router = require('express').Router();
const Article = require('../model/Article');
const { articleValidation } = require('../validation');
const verify = require('./verifyToken');

router.post('/articles/create', verify, async (req, res) => {
    try {
        // Let's first validate an article
        const { error } = articleValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Create a new article
        const article = new Article({
            title: req.body.title,
            content: req.body.content
        });
        await article.save();
        res.json(article);
    } catch(err) {
        res.json(err.message);
    }
});

// Get all articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch(err) {
        res.json(err.message);
    }
});

// Get a specific article
router.get('/articles/:postId', async (req, res) => {
    try {
        const article = await Article.findById(req.params.postId);
        res.json(article);
    } catch(err) {
        res.send(err.message);
    }
});

// Delete an article
router.delete('/articles/:postId', verify, async (req, res) => {
    try {
        const deletedArticle = await Article.remove({ _id: req.params.postId });
        res.json(deletedArticle);
    }catch(err) {
        res.send(err.message);
    }
});

// Update an article
router.patch('/articles/:postId', verify, async (req, res) => {
    try {
        // Let's first validate an article
        const { error } = articleValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const updatedArticle = await Article.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title, content:req.body.content } }
        );
        res.json(updatedArticle);
    } catch(err) {
        res.send(err.message);
    }
});

module.exports = router;
const router = require('express').Router();
const Question = require('../model/Question');
const { questionValidation } = require('../validation');

router.post('/questions/save', async (req, res) => {
    try {
        // Let's first validate a 
        const { error } = questionValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Save a new question
        const question = new Question({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            question: req.body.question
        });
        await question.save();
        res.send(question);
    } catch(err) {
        res.json(err.message);
    }
});

// Get all questions / messages
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch(err) {
        res.json(err.message);
    }
});

// Delete a deletedQuestion
router.delete('/questions/:postId', async (req, res) => {
    try {
        const deletedQuestion = await Question.remove({ _id: req.params.postId });
        res.json(deletedQuestion);
    }catch(err) {
        res.send(err.message);
    }
});

module.exports = router;
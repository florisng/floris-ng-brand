// Import express
const express = require('express');

// Start an app
const app = express();

// Import mongoose
const mongoose = require('mongoose');

// Import routes
const users_routes = require('./routes/users');
const articles_routes = require('./routes/articles');
const questions_routes = require('./routes/questions');
const comments_routes = require('./routes/comments');
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log("Connected to mongoDB !!!");
});

app.use(express.json());

// Use the route
app.use('/api', users_routes);
app.use('/api', articles_routes);
app.use('/api', questions_routes);
app.use('/api', comments_routes);

// Finaly start the server on port 3000
app.listen(3000, () => console.log("Server is now running !!!"));

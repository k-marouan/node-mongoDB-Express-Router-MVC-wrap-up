const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://admin:admin@nodetuts.spdvdfr.mongodb.net/node-tuts-db';
// mongodb+srv://<username>:<password>@nodetuts.spdvdfr.mongodb.net/test
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs'); // if your forder's name "view"

// middleware & static files
app.use(express.static('public')); // public = the folder name
app.use(express.urlencoded({ extended: true })); // takes all url and pass into object
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// add blog
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// get all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// get single blog by id
app.get('/single-blog', (req, res) => {
    Blog.findById('643b574533ee40eb9ba2ada4')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
// app.use(blogRoutes);
app.use('/blogs', blogRoutes); // if we want to remove blogs from the url in blogRoutes.js


// 404 page, the code below should be in the very bottom to work correctly
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
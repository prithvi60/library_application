const express = require('express');
const router = express.Router();
const Author = require('../models/author');
let locals = { errorMessage : `something went wrong` }


// all authors
router.get('/',(req,res)=>{
    res.render('authors/index');
});


// new authors
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author()});
});

// create author
router.post('/',(req,res)=>{
    const author =new Author({
        name: req.body.name
    })
    author.save((err,newAuthor)=>{
        if (err){
            res.render('authors/new',{
              author:author  ,
              locals
            })
        }
        else{
            // res.redirect(`authors/${newAuthor.id}`)
            res.redirect(`authors`)
        }
    })
    // res.send(req.body.name)
})

module.exports = router;
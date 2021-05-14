const express = require('express');
const router = express.Router();
const Author = require('../models/author');
// let locals = { errorMessage : `something went wrong` }


// all authors
router.get('/',async (req,res)=>{
    let searchOptions={}
    if(req.query.name != null && req.query.name !==''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors= await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
});


// new authors
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author()});
});

// create author
router.post('/',async (req,res)=>{
    const author =new Author({
        name: req.body.name
    })
    try{ const newAuthor= await author.save()
         // res.redirect(`authors/${newAuthor.id}`)
         res.redirect(`authors`)

    }catch{
        res.render('authors/new',{
            author:author  ,
            errorMessage : `something went wrong`
          })

    }
  
})

// show author
router.get('/:id',(req,res)=> {
    res.send('Show Author' + req.params.id)
})

// edit author
router.get('/:id/edit',(req,res)=>{
    res.send('Edit Author'+ req.params.id)
})

// Update Author
router.put('/:id',(req,res)=>{
    res.send('Update Author'+ req.params.id)
})
// delete author
router.delete('/:id',(req,res)=>{
    res.send('Delete Author'+ req.params.id)
})
module.exports = router;
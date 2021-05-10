if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser= require('body-parser')

//to get router from index.
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');


app.set('view engine','ejs');
app.use(expressLayouts);
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}))

// import mongoDb
const mongoose= require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology:true})
const db= mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Connected to Mongoose'))

app.use('/', indexRouter);
app.use('/authors', authorRouter);
'authors/new'
app.use('/books', bookRouter);



app.listen(process.env.PORT || 3000 );
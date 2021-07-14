const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser')
const port = process.env.PORT || 2550;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true,useUnifiedTopology:true});

// var db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
//     console.log('we are connected satyam...')
//     });

const contactSchema = new mongoose.Schema({
    name:String,
    age:String,
    mob:String,
    email:String,
    address:String,
    more:String
});

const contact = mongoose.model('contact', contactSchema);

app.set('view enigne','pug')
app.set('views',path.join(__dirname,'view'))

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.status(200).render('home.pug', { title: 'Satya Dance Academy', message:'This is a famous academy for dance site'})
})
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug',{title:'Satya Dance Academy',message:'This is a famous academy for dance site'})
})
// app.post('/contact',(req,res)=>{
//     const name = req.body.name
//     const age = req.body.age
//     const mob = req.body.mob
//     const email = req.body.email
//     const address = req.body.address
//     const more = req.body.more
//     const outlineSave = `the client is ${name} age is ${age} mob is ${mob} email is ${email} address is ${address} and more is ${more}`
//     fs.writeFileSync('outlineTextSave.txt',outlineSave)
//     res.status(200).render('contact.pug',{title:'Satya Dance Academy',message:'This is a famous academy for dance site'})
// })

app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been save to database")
    }).catch(()=>{
        res.status(400).send("item was not save to database")
    })
})


contact.find(function (err, contactDance) {
    if (err) return console.error(err);
    console.log(contact);
})
app.listen(port, () => {
    console.log(`app will be listing at ${port}`)
})
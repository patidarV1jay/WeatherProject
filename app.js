import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { join } from 'path'
import hbs from 'hbs'
import axios from 'axios'

const app = express() 
app.set('view engine','hbs')
app.set('views','./templates/views')

// app.use(express.static('./public',{ index: ['default.html', 'index.html'] }))
const dname = dirname(fileURLToPath(import.meta.url))
hbs.registerPartials(join(dname,'/templates/partials'))
app.use(express.static(join(dname, "public"),{index:false}));

const cPath = join(dname,'/public/contact.html')
app.get("/",(req,res)=>{
   res.render('index',{
    someVar:'Hi, variable here....'
   })   
})
app.get('/about',async(req,res)=>{
    try{
        // const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=69ff4ffc86af76a08944dc09c5407148`)
        // console.log(data.data.main.temp, data.data.name)
        const data = await axios.get("https://dummyjson.com/products")
        console.log(data.data)
    }
   catch(err){
    console.log(err)
   }
    console.log(req.query.name) 
    res.render("about",{
        name:req.query.name,
        
    }) 
})
app.get('/error',(req,res) =>{
    res.send('Itis an error page')
})
app.get('/object',(req,res) =>{
   res.json(undefined)
})
app.get('/about/*',(req,res)=>{
    res.render('error',{ 
        error:'The about page inside is not found.........'
    })
 })
 app.get('/error/*',(req,res)=>{
    res.render('error',{
        error:'The error inside page is not found.........'
    })
 })
 app.get('*',(req,res)=>{
    res.render('error',{
        error:'The page is not found.........'
    })
 })


// app.get('/',(req,res)=>{
//     res.sendFile(join(dname,'/public/default.html'))
// })
// app.get('/contact',(req,res)=>{
//   res.sendFile(cPath)
// })


app.listen(8080,() =>{
    console.log('server started')
})
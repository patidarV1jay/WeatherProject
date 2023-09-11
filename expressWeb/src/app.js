import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'hbs')
app.set('views', join(__dirname,"../template/views"))
// app.use(express.static("../public"))
//  app.use(express.static(join(__dirname,"../public")))  
// app.get("",(req,res)=>{
//     res.send("Homepage")
// })
app.get("",(req,res)=>{
    res.render('index')
})
app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/weather",(req,res)=>{
    res.render('weather')
    // res.sendFile(join(__dirname,"../public/about.html"))
    // res.send("About us page......")
})

// app.get("/about",(req,res)=>{
//     res.sendFile(join(__dirname,"../public/about.html"))
// })
app.get("*",(req,res)=>{
    res.render('error')
})

app.listen(port,()=>{
    console.log('Server started');
})
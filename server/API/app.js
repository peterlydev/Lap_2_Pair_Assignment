const express = require('express') 
const app = express()
app.use(express.json())

const cors = require('cors'); 
app.use(cors());

const Post = require('./Models/post_models')

const port = process.env.PORT || 3000

app.get('/', (req, res) => { res.send('Hello World!')})

//Get all 

app.get('/posts', async (req, res) => {
    try{
        const posts = await Post.all 
        console.log(posts)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get one 

app.get('/posts/:id', async (req, res)=>{
    try{
        const index = parseInt(req.params.id);
        const post = await Post.findById(index)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// Post method to create a new post 

app.post('/posts', async (req, res)=>{
    try{
        console.log(req.body)
        const post = await Post.create(req.body)
        res.status(201).json(post)
    }
    catch(err){
        res.status(422).json(err)
    }
})
  
app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
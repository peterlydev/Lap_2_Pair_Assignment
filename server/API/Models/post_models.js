const db = require ('../dbConfig')

class Post {
    constructor(data){
        this.id = data.id 
        this.title = data.title
        this.author = data.author
        this.body= data.body
    }

    static get all (){
        return new Promise(async (resolve, reject)=>{
            try{
                // console.log('Function Fired')
                let posts = await db.query(`SELECT * FROM posts;`)
                // console.log(posts)
                const allPosts = posts.rows.map(d => new Post(d))
                // console.log(allPosts)
                resolve(allPosts)
            }
            catch(err){
                reject ('Posts not found')
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject)=>{
            try{
                let getPost = await db.query(`SELECT * FROM posts WHERE posts.id = $1;`, [id])
                let post = new Post(getPost.rows[0])
                resolve(post)
            }
            catch(err){
                reject('Post not found')
            }
        })
    }

    static create(data){
        return new Promise (async (resolve, reject)=>{
            try{
                // const {title, author, body} = data
                let insertPost = await db.query(`INSERT INTO posts (title, author, body) VALUES ($1, $2, $3) RETURNING *;`, [data.title, data.author, data.body])
                let createPost = new Post(insertPost.rows[0])
                resolve(createPost)
            }
            catch(err){
                reject('Cannot create post')
            }
        })
    }
}

module.exports = Post
const express = require('express') 
const app = express()
app.use(express.json())

const cors = require('cors'); 
app.use(cors());

const port = process.env.PORT || 3000

app.get('/', (req, res) => { res.send('Hello World!')})

//Get all 

//Get one 

// Post method to create a new post 
  
app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
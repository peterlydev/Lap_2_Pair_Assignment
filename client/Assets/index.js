// const formEl = document.querySelector('form')
// formEl.addEventListener('submit', createPost)

// function createPost(e){
//     e.preventDefault()
//     const dataObj = new FormData(formEl)
//     const formDataSerialised=Object.fromEntries(dataObj)
//     console.log(dataObj)

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(formDataSerialised),
//         headers: {'Content-type': 'application/json'}
//     }

//     fetch('http://localhost:3000/posts', options)
//     .then(resp => resp.json())
//     .then(resp=> console.log(resp))
// }
let id 
document.querySelector('#input-form').addEventListener('submit', createPost)

async function createPost(e) {
    e.preventDefault();
    try{
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title: e.target.title.value, author: e.target.author.value, body: e.target.body.value})
        }
        const response = await fetch(`http://localhost:3000/posts`, options);
        const post = await response.json();
        id = post.id
        window.location.hash = `#${post.id}`//Look up
    } catch (err) {
        console.log(err)
    }
}

window.addEventListener('hashchange', update)
window.addEventListener('load', update);

async function update() {
    // let hash = window.location.substring(1);
    if (id) {
        let postData = await getPost(id)
        console.log(postData)
        showPost(postData)
    } else {
        document.querySelector("post-title").textContent = "";
        document.querySelector("post-author").textContent = "";
        document.querySelector("post-body").textContent = "";
        form.classList.remove("hidden");
        postContent.classList.add("hidden");
    }
}

async function getPost(id) {
    try{
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const postData = await response.json();
        return postData
    } catch (err) {
        console.log(err)
    }
}

const form = document.querySelector('.telegraph')
const postContent = document.querySelector('#post')

function showPost(postData) {
    console.log(typeof (postData))
    form.classList.add("hidden");
    postContent.classList.remove("hidden");
    if (typeof postData !== 'undefined') {

        document.querySelector("#post-title").textContent = postData.title;
        document.querySelector("#post-author").textContent = postData.author;
        document.querySelector("#post-body").textContent = postData.body;

    } else {
        document.querySelector('#post-title').textContent = 'Post does not exist'
    }
}

document.querySelector('.back-btn').addEventListener('click', () => {
    window.location.hash = ''
})
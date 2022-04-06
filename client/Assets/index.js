const formEl = document.querySelector('form')
formEl.addEventListener('submit', createPost)

function createPost(e){
    e.preventDefault()
    const dataObj = new FormData(formEl)
    const formDataSerialised=Object.fromEntries(dataObj)
    // console.log(formDataSerialised)

    const options = {
        method: 'POST',
        body: JSON.stringify(formDataSerialised),
        headers: {'Content-type': 'application/json'}
    }

    fetch('http://localhost:3000/posts', options)
    .then(resp => resp.json())
    .then(resp=> console.log(resp))
}
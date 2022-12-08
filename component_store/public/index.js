//const feedDisplay = document.getElementById("feed")
//http://localhost:4000/nisha


// fetch('http://localhost:4000/nisha')
// .then(res => res.json())
// .then(data => {
//     data.map((items => {
//         const user1 = `User`
//     }))
// })
// .catch(err => console.log(err))

const getBtn = document.getElementById('get')
const postBtn = document.getElementById('post')
const input = document.getElementById('input')

const baseUrl = 'http://localhost:8383/info';

getBtn.addEventListener('click', getInfo)
postBtn.addEventListener('click', postInfo)

async function getInfo(e) {
    e.preventDefault()
    const res = await fetch(baseUrl, {
        method : 'GET'
    });
    const data = await res.json();
    console.log(data);
    input.value = data.info
}

async function postInfo(e) {
    e.preventDefault()
    if (input.value == "") { return}
    const response = await fetch(baseUrl, {
        method : 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
           parcel: input.value
        })
    });
    console.log("set data");
}


const getBtn = document.getElementById('get')
const postBtn = document.getElementById('post')
const input = document.getElementById('input')

const baseUrl = 'http://localhost:8383/info';

// getBtn.addEventListener('click', getInfo)
// postBtn.addEventListener('click', postInfo)

async function getInfo(e) {
    e.preventDefault()
    const res = await fetch(baseUrl, {
        headers: {
            'Accept': 'application/json'
          },
        method : 'GET'
    });
    console.log("response",res);
    const data = await res.json();
    console.log("data fetched###",data);
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

const uploadInput = document.getElementById('upload');
const link = document.getElementById('link');
console.log("link###",link);
let objectURL;

uploadInput.addEventListener('change', function () {
  if (objectURL) {
    // revoke the old object url to avoid using more memory than needed
    URL.revokeObjectURL(objectURL);  
  }

  const file = this.files[0];
  console.log("file###",file);
  objectURL = URL.createObjectURL(file);
  console.log("objectURL###",objectURL);
  link.download = file.name; // this name is used when the user downloads the file
  link.href = objectURL;

});
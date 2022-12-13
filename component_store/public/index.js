
const getBtn = document.getElementById('get')
const postBtn = document.getElementById('post')
const input = document.getElementById('input')

const baseUrl = 'http://localhost:8383/info';

getBtn && getBtn.addEventListener('click', getInfo)
postBtn && postBtn.addEventListener('click', postInfo )

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
    console.log("Data send to backend!");
}


$('#summernote').summernote({
  placeholder: 'Add some instructions to integrate the component.',
      tabsize: 2,
      height: 100,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']]
      ]
});




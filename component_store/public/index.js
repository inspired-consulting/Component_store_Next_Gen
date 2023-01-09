const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const input = document.getElementById('input');

const baseUrl = 'http://localhost:8383/info';

// eslint-disable-next-line no-unused-expressions
getBtn && getBtn.addEventListener('click', getInfo);
// eslint-disable-next-line no-unused-expressions
postBtn && postBtn.addEventListener('click', postInfo);

async function getInfo(e) {
    e.preventDefault();
    const res = await fetch(baseUrl, {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
    });
    console.log('response', res);
    const data = await res.json();
    console.log('data fetched###', data);
    input.value = data.info;
}

async function postInfo(e) {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (input.value == '') { return; }
    // eslint-disable-next-line no-unused-vars
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            parcel: input.value,
        }),
    });
    console.log('Data send to backend!');
}

// eslint-disable-next-line no-undef
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
        ['view', ['fullscreen', 'codeview', 'help']],
    ],
});

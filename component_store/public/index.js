
// summernote
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
        ['view', ['fullscreen', 'codeview', 'help']]
    ]
});

// File upload
const uploadFile = document.querySelector('#uploadFile')
document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';

uploadFile.addEventListener('keyup', function (e) {
    const requiredInputs = document.querySelectorAll('input[required]')
    const submitBtn = document.querySelector('#submitBtn')
    let buttonDisabled = false
    requiredInputs.forEach(function (input) {
        if (input.value === '' || !input.value.replace(/\s/g, '').length) {
            buttonDisabled = true
        }
    })
    if (buttonDisabled) {
        document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';
        submitBtn.setAttribute('disabled', 'disabled')
    } else {
        document.querySelector('#buttonText').innerHTML = '';
        submitBtn.removeAttribute('disabled')
    }
})

// const uploadFile = document.querySelector('#uploadFile')
// document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';

// uploadFile.addEventListener('keyup', function (e) {
//     // eslint-disable-next-line no-undef
//     $('.requiredFields').each(function () {
//         let buttonDisabled = true;
//         const componentName = document.querySelector('#componentName').value;
//         const inputVersion = document.querySelector('#inputVersion').value;
//         const value = this.value;
//         if (value && (value.trim() !== '') && componentName && inputVersion) {
//             console.log('IF CASE');
//             buttonDisabled = false;
//             // eslint-disable-next-line no-undef
//             $('#submitBtn').attr('disabled', false);
//             document.querySelector('#buttonText').innerHTML = ''
//         } else {
//             console.log('ELSE CASE');
//             // eslint-disable-next-line no-unused-vars
//             buttonDisabled = true;
//             // eslint-disable-next-line no-undef
//             $('#submitBtn').attr('disabled', true);
//             document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';
//         }
//     });
// })

// // File upload
// const inputs = document.querySelectorAll('.requiredFields');
// console.log('inputs', inputs);
// const button = document.querySelector('#submitBtn');
// button.disabled = true;
// document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';
// inputs.addEventListener('change', stateHandle);

// // eslint-disable-next-line no-unused-vars
// function stateHandle () {
//     if (document.querySelector('#componentName').value === '') {
//         button.disabled = true;
//         document.querySelector('#buttonText').innerHTML = 'Bitte beachte, dass alle mit * markierten Felder Pflichtfelder sind!';
//     } else {
//         button.disabled = false;
//         document.querySelector('#buttonText').innerHTML = '';
//     }
// }
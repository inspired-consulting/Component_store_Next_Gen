
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
let isComponentNameOk = false;
let isVersionOk = false;
let isRequiredOk = true;
let isUploadOk = false;

const uploadFile = document.querySelector('#uploadFile')
//validationMsg('#buttonMsg', 'Please note that all fields marked with * are required !', 'Error')
const submitBtn = document.querySelector('#submitBtn')
enableUpload();

// Check if input value already exist in database
const checkExists = (e) => {
    const source = e.target || e.srcElement;
    console.log('source', source.name, source.value);
    const url = '/api/exists/' + source.name + '/' + source.value;
    const myRequest = new Request(url);
    const componentName = document.querySelector('#componentName').value;
    fetch(myRequest)
        .then((response) => {
            if (response.ok) {
                validationMsg('#componentMsg', 'This value already exist, please choose another.', 'Error')
                validationMsg('#versionMsg', '', 'Error')
                isComponentNameOk = false
            } else {
                validationMsg('#componentMsg', 'This name is available.', 'Success')
                validationMsg('#versionMsg', '', 'Error')
                isComponentNameOk = true;
                if (componentName.length <= 0) {
                    validationMsg('#componentMsg', '', 'Success')
                    validationMsg('#versionMsg', '', 'Error')
                    isComponentNameOk = false;
                } else {
                    componentNameValidation(componentName);
                    validationMsg('#versionMsg', '', 'Error')
                }
            }
            enableUpload();
        })
}

document.querySelector('#componentName').addEventListener('keyup', checkExists)

// check if file upload has some value
// eslint-disable-next-line no-undef
$('#upload').change(function () {
    // eslint-disable-next-line no-undef
    if ($(this).val() === '') {
        isUploadOk = false;
        validationMsg('#fileUploadMsg', 'Please select the file.', 'Error')
    } else {
        isUploadOk = true;
        validationMsg('#fileUploadMsg', '', 'Error')
    }
    enableUpload();
});

uploadFile.addEventListener('keyup', function (e) {
    const requiredInputs = document.querySelectorAll('input[required]')
    const inputVersion = document.querySelector('#inputVersion').value;
    const requiredInputsArray = Array.from(requiredInputs);
    isRequiredOk = true;
    // eslint-disable-next-line array-callback-return
    requiredInputsArray.every(input => {
        if (input.value === '' || !input.value.replace(/\s/g, '').length) {
            isRequiredOk = false;
            return false;
        } else {
            return true;
        }
    })

    // check if version is valid
    if (!symenticVersionValidation(inputVersion) || (inputVersion.length <= 0)) {
        isVersionOk = false;
        validationMsg('#versionMsg', 'Please use sementic version with digits follwed by dot eg: 1.0.0 ; 10.02.23-version', 'Error')
    } else {
        isVersionOk = true;
        validationMsg('#versionMsg', '', 'Error')
    }
    enableUpload();
})

// check if component name is valid
function componentNameValidation (val) {
    const regexStr = /^[a-z0-9\d-]*$/;
    if (regexStr.test(val)) {
        isComponentNameOk = true;
    } else {
        validationMsg('#componentMsg', 'Please use only lowecase and hypens to seperate the words.', 'Error')
        isComponentNameOk = false;
    }
    enableUpload();
}

function symenticVersionValidation (val) {
    const regexStr = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    return regexStr.test(val); // validates regex on Version input value and return true if passed.
}

function validationMsg (id, msg, type) {
    document.querySelector(id).innerHTML = msg;
    if (type === 'Success') {
        document.querySelector(id).className = 'text-success'
    } else {
        document.querySelector(id).className = 'text-danger'
    }
}

function enableUpload () {
    if (Boolean(isComponentNameOk) && Boolean(isVersionOk) && Boolean(isRequiredOk) && Boolean(isUploadOk)) {
        submitBtn.removeAttribute('disabled');
        document.querySelector('#buttonMsg').innerHTML = '';
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
        document.querySelector('#buttonMsg').innerHTML = 'Please note that all fields marked with * are required !';
    }
}

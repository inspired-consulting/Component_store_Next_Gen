
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
const submitBtn = document.querySelector('#submitBtn')
if (submitBtn) {
    document.querySelector('#buttonMsg').innerHTML = 'Please note that all fields marked with * are required !';
}

// Check if input value already exist in database
const checkExists = (e) => {
    const source = e.target || e.srcElement;
    console.log('source', source.name, source.value);
    const url = '/api/exists/' + source.name + '/' + source.value;
    const myRequest = new Request(url);
    const componentName = document.querySelector('#componentName').value;
    fetch(myRequest)
        .then((response) => {
            validationMsg('#versionMsg', '', 'Error')
            if (response.ok) {
                validationMsg('#componentMsg', 'This value already exist, please choose another.', 'Error')
                isComponentNameOk = false
            } else {
                validationMsg('#componentMsg', 'This name is available.', 'Success')
                isComponentNameOk = true;
                if (componentName.length <= 0) {
                    validationMsg('#componentMsg', '', 'Success')
                    isComponentNameOk = false;
                } else {
                    componentNameValidation(componentName);
                }
            }
            enableUpload();
        })
}
if (submitBtn) {
    document.querySelector('#componentName').addEventListener('keyup', checkExists)
}

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

if (submitBtn) {
    uploadFile.addEventListener('keyup', function (e) {
        const requiredInputs = document.querySelectorAll('input[required]')
        const inputVersion = document.querySelector('#inputVersion').value;
        const publisher = document.querySelector('#publisher').value;
        const requiredInputsArray = Array.from(requiredInputs);
        isRequiredOk = true;

        requiredInputsArray.forEach(input => {
            validationMsg('#versionMsg', '', 'Error')
            if (input.value === '' || !input.value.replace(/\s/g, '').length) {
                if (publisher) {
                    validationMsg('#publisherErrorMsg', 'Please use the correct way!', 'Error')
                } else {
                    validationMsg('#publisherErrorMsg', '', 'Error')
                }
                isRequiredOk = false;
            }
        })

        // check if version is valid
        if (inputVersion) {
            if (!symenticVersionValidation(inputVersion) || (inputVersion.length <= 0)) {
                isVersionOk = false;
                validationMsg('#versionMsg', 'Please use sementic version with digits follwed by dot eg: 1.0.0', 'Error')
            } else {
                isVersionOk = true;
                validationMsg('#versionMsg', '', 'Error')
            }
        }

        enableUpload();
    })
}

// check if component name is valid
function componentNameValidation (val) {
    const regexStr = /^[a-z0-9\d-]*$/;
    if (regexStr.test(val)) {
        isComponentNameOk = true;
    } else {
        validationMsg('#componentMsg', 'Please use only lowecase and hypens to seperate the words.', 'Error')
        isComponentNameOk = false;
    }
    // enableUpload();
}

// validates regex on Version input value and return true if passed.
function symenticVersionValidation (val) {
    const regexStr = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
    const result = regexStr.test(val)
    return result;
}

// validation error messages based on Id
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

const componentSubmitBtn = document.querySelector('#componentSubmitBtn')
let isUpdateComponentNameOk = false;
validationMsg('#componentBtnMsg', 'Please fill the existing component names only !', 'Error')
const checkExists2 = (e) => {
    const source = e.target || e.srcElement;
    console.log('source from UPDATE##', source.name, source.value);
    const url = '/api/exists/' + source.name + '/' + source.value;
    const myRequest = new Request(url);
    fetch(myRequest)
        .then((response) => {
            if (response.ok) {
                validationMsg('#updateComponentMsg', 'This  name exist.', 'Success')
                isUpdateComponentNameOk = true
            } else {
                validationMsg('#updateComponentMsg', 'This name do not exists.', 'Error')
                isUpdateComponentNameOk = false
            }

            if (isUpdateComponentNameOk) {
                componentSubmitBtn.removeAttribute('disabled');
                document.querySelector('#componentBtnMsg').innerHTML = '';
            } else {
                componentSubmitBtn.setAttribute('disabled', 'disabled');
                document.querySelector('#componentBtnMsg').innerHTML = 'Please fill the existing component names only !';
            }
        })
}

document.querySelector('#componentName').addEventListener('keyup', checkExists2)

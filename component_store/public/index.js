
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
            validationMsg('#publisherErrorMsg', '', 'Error')
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
    const regexStr = /^[a-z][a-z0-9\d-]*$/;

    // const regexStr = /([a-z][a-z0-9 ])/
    if (regexStr.test(val)) {
        isComponentNameOk = true;
    } else {
        validationMsg('#componentMsg', 'Please start with lowercase optional with numbers and hypens to seperate the words.', 'Error')
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

// For updating the component

function enableUpdate () {
    if (Boolean(isVersionOk) && Boolean(isRequiredOk) && Boolean(isUploadOk)) {
        updateComponentBtn.removeAttribute('disabled');
        document.querySelector('#updateComponentBtnMsg').innerHTML = '';
    } else {
        updateComponentBtn.setAttribute('disabled', 'disabled');
        document.querySelector('#updateComponentBtnMsg').innerHTML = 'Please note that all fields marked with * are required !';
    }
}

const updateComponentBtn = document.querySelector('#updateComponentBtn')
const updateUploadFile = document.querySelector('#updateUploadFile')

if (updateComponentBtn) {
    enableUpdate();
}

if (updateComponentBtn) {
    updateUploadFile.addEventListener('change', validateInputUpdate, false);
    updateUploadFile.addEventListener('keyup', validateInputUpdate, false);
}

// eslint-disable-next-line no-undef
$('#updateFileUpload').change(function () {
    // eslint-disable-next-line no-undef
    if ($(this).val() === '') {
        isUploadOk = false;
        validationMsg('#updateFileUploadMsg', 'Please select the file.', 'Error')
    } else {
        isUploadOk = true;
        validationMsg('#updateFileUploadMsg', '', 'Error')
    }
    enableUpdate();
});

function validateInputUpdate () {
    const requiredInputs = document.querySelectorAll('input[required]')
    const updateInputVersion = document.querySelector('#updateInputVersion').value;
    const updatePublisher = document.querySelector('#updatePublisher').value;
    const currentVersion = document.querySelector('#currentVersion').childNodes[0].data;
    const requiredInputsArray = Array.from(requiredInputs);
    isRequiredOk = true;

    requiredInputsArray.forEach(input => {
        validationMsg('#updateVersionMsg', '', 'Error')
        validationMsg('#updatePublisherMsg', '', 'Error')
        if (input.value === '' || !input.value.replace(/\s/g, '').length) {
            if (updatePublisher) {
                validationMsg('#updatePublisherMsg', 'Please fill the value!', 'Error')
            } else {
                validationMsg('#updatePublisherMsg', '', 'Error')
            }
            isRequiredOk = false;
        }
    })

    // check if version is valid
    if (updateInputVersion) {
        if (!symenticVersionValidation(updateInputVersion) || (updateInputVersion.length <= 0)) {
            isVersionOk = false;
            validationMsg('#updateVersionMsg', 'Please use sementic version with digits follwed by dot eg: 1.0.0', 'Error')
        } else if (!isNewerVersion(currentVersion, updateInputVersion)) {
            isVersionOk = false;
            validationMsg('#updateVersionMsg', 'Please use higher version than the current version', 'Error')
        } else {
            isVersionOk = true;
            validationMsg('#updateVersionMsg', '', 'Error')
        }
    }

    // function to compare the versions
    function isNewerVersion (oldVer, newVer) {
        console.log('oldVer,', oldVer, ' newVer', newVer);
        const oldParts = oldVer.split('.')
        const newParts = newVer.split('.')
        for (let i = 0; i < newParts.length; i++) {
            const a = ~~newParts[i] // parse int
            const b = ~~oldParts[i] // parse int
            if (a > b) return true
            if (a < b) return false
        }
        return false
    }

    enableUpdate();
}
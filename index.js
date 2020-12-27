const user = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirm = document.querySelector(".confirmation");
const button = document.querySelector("button");
const form = document.querySelector("form");


//Missing fields error message

function showMissingError(input, message){

    document.querySelector(`.${input.className}-error`).innerHTML = message;
    document.querySelector(`.${input.className}-error`).style.visibility = "visible";
    input.parentElement.className = "fail";
}

//Success message

function showSuccess(input){
    document.querySelector(`.${input.className}-error`).style.visibility = "hidden";
    input.parentElement.className = "success";
}

//valid email

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//valid Length

function validLength(field, min, max){
    const isValid_1 = field.length >= min ? true : false;
    const isValid_2 = field.length <= max ? true : false;

    return isValid_1 && isValid_2;
}

// Check rquired fields

function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() == ""){
            showMissingError(input, `${getFieldName(input)} is required`);
        }
        else if(input == password && !validLength(input.value, 8, 64)){
            showMissingError(input, `${getFieldName(input)} should be between 8 and 64`);
        }
        else if(input == email && !validateEmail(input.value)){
            showMissingError(input, `${getFieldName(input)} is not valid`);
        }
        else if(input == confirm && input.value !== password.value){
            showMissingError(input, `Passwords don't match`);
        }
        else if(input == user && !validLength(input.value, 3, 15)){
            showMissingError(input, `Username should be between 3 and 15`);
        }
        else{
            showSuccess(input);
        }
    });
}

// get field name

function getFieldName(field){
    return field.className.charAt(0).toUpperCase() + field.className.slice(1);
}

//event listeners//

form.addEventListener("submit", function (e){
    e.preventDefault();

    checkRequired([email, user, password, confirm]);


})



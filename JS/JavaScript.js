let $ = document;

let isNameValidated = false;
let isLastNameValidated = false;
let isPhoneNumberValidated = false;
let isEmailValidated = false;

let city = {
    Tehran: ['پایانه جنوب(خزانه)', 'پایانه بیهقی', 'پایانه آزادی(غرب)', 'پایانه شرق(تهران پارس)'],
    Karaj: ['پایانه شهید کلانتری'],
    Esfahan: ['پایانه کاوه', 'پایانه صفه', 'پایانه جی', 'پایانه زاینده رود'],
    Kermanshah: ['پایانه شهید کاویانی', 'پایانه راه کربلا', 'پایانه اسلام آباد']
}



let body = $.querySelector('body');

let nameInp = $.getElementById('name');

let lastNameInp = $.getElementById('lastName');

let phoneNumberInp = $.getElementById('phoneNumber');

let emailInp = $.getElementById('email');

let city1 = $.getElementById('city1');
let terminal1 = $.getElementById('terminal1');

let city2 = $.getElementById('city2');
let terminal2 = $.getElementById('terminal2');

let submitBtn = $.getElementById('submitBTN');

let statuss = $.querySelector('.status');

//setInterval(changeBackground, 10000);
changeBackground();

submitBtn.addEventListener('mouseover', mouseover);
submitBtn.addEventListener('mouseout', mouseout);

nameInp.addEventListener('blur', nameValidate);

lastNameInp.addEventListener('blur', lastNameValidate);

phoneNumberInp.addEventListener('blur', phoneNumberValidate);

emailInp.addEventListener('blur', emailValidate);

city1.addEventListener('change', locationn);

city2.addEventListener('change', destination);

submitBtn.addEventListener('click', sendform);

function changeBackground() {
    //alert('bck changed')
    let rnd = (Math.random() * 7);
    rnd = Math.round(rnd);
    //alert(rnd);
    rnd = String(rnd);
    let temp = 'url(../Other/img' + rnd + '.jpg)';
    //alert(temp);
    body.style.backgroundImage = temp;
}


function nameValidate() {
    let name = nameInp.value;
    //alert(name);
    if (name.length === 0) {
        nameInp.style.outline = '0px solid black';
        isNameValidated = false;
    } else if ((name.length > 15 || name.length < 3) && name.length != 0) {

        nameInp.style.outline = '1px solid red';
        isNameValidated = false;
    } else {
        isNameValidated = true;
        nameInp.style.outline = '1px solid rgba(132, 255, 0)';
    }


}

function lastNameValidate() {
    let lastName = lastNameInp.value;
    //alert(lastName);
    if (lastName.length === 0) {
        isLastNameValidated = false;
        lastNameInp.style.outline = '0px solid black';
    } else if ((lastName.length > 15 || lastName.length < 3) && lastName.length != 0) {
        lastNameInp.style.outline = '1px solid red';
        isLastNameValidated = false;
    } else {
        lastNameInp.style.outline = '1px solid rgba(132, 255, 0)';
        isLastNameValidated = true;
    }
}


function phoneNumberValidate() {
    let phoneNumber = phoneNumberInp.value;
    let temp = String(phoneNumber);
    let temp2 = Number(temp);
    let temp3 = temp[1] + temp[2] + temp[3] + temp[4] + temp[5] + temp[6] + temp[7] + temp[8] + temp[9] + temp[10] + temp[11] + temp[12];
    let temp4 = Number(temp3);
    if (phoneNumber.length === 0) {
        isPhoneNumberValidated = false;
        phoneNumberInp.style.outline = '0px solid rgba(132, 255, 0)';
    } else if ((!isNaN(temp2) && phoneNumber.length === 11 && temp[0] === '0' && temp[1] === '9') || (!isNaN(temp4) && phoneNumber.length === 13 && temp[0] === '+' && temp[1] === '9' && temp[2] === '8')) {
        phoneNumberInp.style.outline = '1px solid rgba(132, 255, 0)';
        isPhoneNumberValidated = true;
    } else {
        phoneNumberInp.style.outline = '1px solid red';
        isPhoneNumberValidated = false;
    }

}



function emailValidate() {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let email = emailInp.value;
    if (email.length === 0) {
        isEmailValidated = false;
        emailInp.style.outline = '0px solid rgba(132, 255, 0)';
    } else if (pattern.test(email) === false) {
        // alert('آدرس ایمیل وارد شده نامعتبر است');
        emailInp.style.outline = '1px solid red';
        isEmailValidated = false;
    } else {
        emailInp.style.outline = '1px solid rgba(132, 255, 0)';
        isEmailValidated = true;
    }


}

function locationn() {
    //alert('changed');
    terminal1.innerHTML = '';
    if (city1.value === 'Empty') {
        terminal1.innerHTML = '';
    }
    city[city1.value].forEach(function(a) {

        let newElem = $.createElement('option');
        newElem.innerHTML = a;
        newElem.setAttribute('value', a);
        terminal1.append(newElem);
    })
}

function destination() {
    //alert('changed');
    terminal2.innerHTML = '';
    if (city2.value === 'Empty') {
        terminal2.innerHTML = '';
    }
    city[city2.value].forEach(function(b) {
        let newElem = $.createElement('option');
        newElem.innerHTML = b;
        newElem.setAttribute('value', b);
        terminal2.append(newElem);
    })
}

function sendform() {
    //alert('slm');
    if (nameInp.value.length === 0 || lastNameInp.value.length === 0 || phoneNumberInp.value.length === 0 || emailInp.value.length === 0 || city1.value === 'Empty' || city2.value === 'Empty') {
        submitBtn.innerHTML = 'لطفا فیلد های خالی را پر کنید و سپس ادامه دهید.';
        submitBtn.style.fontSize = 'medium';
        submitBtn.style.backgroundColor = 'red';
        submitBtn.style.width = '100%';
        submitBtn.style.boxShadow = '0px 0px 0px 0px'
        submitBtn.removeEventListener('click', sendform);
        submitBtn.removeEventListener('mouseover', mouseover);
        submitBtn.removeEventListener('mouseout', mouseout);
    } else if (isNameValidated && isLastNameValidated && isPhoneNumberValidated && isEmailValidated && terminal1.innerHTML != '' && terminal2.innerHTML != '') {
        submitBtn.innerHTML = 'عملیات ثبت با موفقیت انجام شد.';
        submitBtn.style.fontSize = 'medium';
        submitBtn.style.backgroundColor = 'rgba(132, 255, 0)';
        submitBtn.style.width = '100%';
        submitBtn.style.boxShadow = '0px 0px 0px 0px'
        submitBtn.removeEventListener('click', sendform);
        submitBtn.removeEventListener('mouseover', mouseover);
        submitBtn.removeEventListener('mouseout', mouseout);
    } else {
        submitBtn.innerHTML = 'لطفا خطا هارا رفع کرده و مجددا تکرار نمایید.';
        submitBtn.style.fontSize = 'medium';
        submitBtn.style.backgroundColor = 'red';
        submitBtn.style.width = '100%';
        submitBtn.style.boxShadow = '0px 0px 0px 0px'
        submitBtn.removeEventListener('click', sendform);
        submitBtn.removeEventListener('mouseover', mouseover);
        submitBtn.removeEventListener('mouseout', mouseout);
    }
    setTimeout(function() {

        submitBtn.innerHTML = 'ثبت';
        submitBtn.style.fontSize = 'large';
        submitBtn.style.backgroundColor = 'rgba(132, 255, 0, 0.797)';
        submitBtn.style.width = '100px';
        submitBtn.addEventListener('mouseover', mouseover);
        submitBtn.addEventListener('mouseout', mouseout);
        submitBtn.addEventListener('click', sendform);
    }, 2500)


}

function mouseover() {
    submitBtn.style.width = '101px';
    submitBtn.style.height = '36px';
    submitBtn.style.backgroundColor = 'rgb(132, 255, 0)';
    submitBtn.style.boxShadow = '0px 0px 10px 0px rgb(132, 255, 0)';

}

function mouseout() {
    submitBtn.style.width = '100px';
    submitBtn.style.height = '35px';
    submitBtn.style.backgroundColor = 'rgba(132, 255, 0, 0.797)';
    submitBtn.style.boxShadow = '0px 0px 0px 0px';
}
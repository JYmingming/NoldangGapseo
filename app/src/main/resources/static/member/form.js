
var xEmail = document.querySelector("input[name=email]");
var xNickName = document.querySelector("input[name=nickName]");
var xPhone = document.querySelector("input[name=phone]");
var xPassword = document.querySelector("input[name=password]");
var xEmailCheck = document.querySelector("input[name=email-checking-code]");

document.querySelector("form[name=form2]").onsubmit = function() {
    if (xEmail.value == "" ||
        xNickName.value == "" ||
        xPhone.value == "" ||
        xPassword.value == "") {
        window.alert("필수 입력 항목이 비어 있습니다.");
        return false;
    }else if(emailCheckflag==0){
        window.alert("이메일 인증번호를 확인해주세요.");
    }
    else if(
        nickNameCheck == 1 ||
        phoneCheck == 1 ||
        emailCheck ==1 ||
        passwordCheck == 1){
        window.alert( "양식을 확인해주세요.")
        console.log(nickNameCheck+" "+phoneCheck+""+emailCheck+""+passwordCheck)
        return false
    }

    var fd = new FormData(document.forms.namedItem("form2"));

    fetch("/user/signup", {
        method: "POST",
        body: new URLSearchParams(fd)
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.resStatus == "success") {
                window.alert("회원가입 완료!");
                location.href = "../indexPage/index.html";
            } else {
                window.alert("회원가입 실패!!");
            }
        });
    return false;
};


//css 함수
function css(selector, name, value) {
    var el = document.querySelectorAll(selector);
    for (var e of el) {
        e.style[name] = value;
    }
}


css('.nickName-check-ok','visibility','hidden');
css('.nickName-check-no',`visibility`,'hidden');
let nickNameCheck = 0; //닉네임 중복 여부
$('input[name=nickName]').keyup(function() {
    let nickNameKeyup = $(this).val();
    console.log(nickNameKeyup);
    fetch("/user/search/nickNameCall?nickName="+nickNameKeyup)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
        if (result.status == "fail") {
            window.alert("서버 요청 오류!");
            console.log(result.data);
            return;
        }
        if(result.length==0){
            css('.nickName-check-ok','display','');
            css('.nickName-check-no','display','none');
            css('.nickName-check-ok','visibility','');
            css('.nickName-check-no','visibility','');
            nickNameCheck = 0;
        }else{
            css('.nickName-check-ok','display','none');
            css('.nickName-check-no',`display`,'');
            nickNameCheck = 1;
        }
    })
})

css('.email-check-ok','visibility','hidden');
css('.email-check-no',`visibility`,'hidden');
let emailCheck = 0; //닉네임 중복 여부
$('input[name=email]').keyup(function() {
    let emailKeyup = $(this).val();
    console.log(emailKeyup);
    fetch("/user/search/email?email="+emailKeyup)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
        if (result.status == "fail") {
            window.alert("서버 요청 오류!");
            console.log(result.data);
            return;
        }
        if(result.length==0){
            css('.email-check-ok','display','');
            css('.email-check-no','display','none');
            css('.email-check-ok','visibility','');
            css('.email-check-no','visibility','');
            emailCheck = 0;
        }else{
            css('.email-check-ok','display','none');
            css('.email-check-no',`display`,'');
            emailCheck = 1;
        }
    })
})


css('.phone-check-ok','visibility','hidden');
css('.phone-check-no',`visibility`,'hidden');
let phoneCheck = 0; //닉네임 중복 여부
$('input[name=phone]').keyup(function() {
    let phoneKeyup = $(this).val();
    console.log(phoneKeyup);
    fetch("/user/search/phone?phone="+phoneKeyup)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
        if (result.status == "fail") {
            window.alert("서버 요청 오류!");
            console.log(result.data);
            return;
        }
        if(result.length==0){
            css('.phone-check-ok','display','');
            css('.phone-check-no','display','none');
            css('.phone-check-ok','visibility','');
            css('.phone-check-no','visibility','');
            phoneCheck = 0;
        }else{
            css('.phone-check-ok','display','none');
            css('.phone-check-no',`display`,'');
            phoneCheck = 1;
        }
    })
})
css('.password-check-ok','visibility','hidden');
css('.password-check-no',`visibility`,'hidden');
let passwordCheck = 1; //비밀번호 체크여부
$('input[name=password-check]').keyup(function() {
    let passwordKeyup = $(this).val();
    let passwordCheckKeyup=$('#password-c').val();
    if(passwordKeyup != passwordCheckKeyup){
        css('.password-check-ok','display','');
        css('.password-check-no','display','none');
        css('.password-check-ok','visibility','');
        css('.password-check-no','visibility','');
        passwordCheck =1;
        console.log(passwordCheck);
    }else{
        css('.password-check-ok','display','none');
        css('.password-check-no',`display`,'');
        passwordCheck =0;
        console.log(passwordCheck);
    }
})

//반대로 비밀번호를 나중에 변경했을 시
$('#password-c').keyup(function() {
    let passwordKeyup = $(this).val();
    let passwordCheckKeyup=$('input[name=password-check]').val();
    if(passwordKeyup != passwordCheckKeyup){
        css('.password-check-ok','display','');
        css('.password-check-no','display','none');
        css('.password-check-ok','visibility','');
        css('.password-check-no','visibility','');
        passwordCheck = 0;
    }else{
        css('.password-check-ok','display','none');
        css('.password-check-no',`display`,'');
        passwordCheck = 1;
    }
})
$('.email-checking').click(function() {
    fetch(`/service/mail?userId=${xEmail.value}`, {
        method: "POST"
    })
})
$('.email-checking').click(function() {
    fetch(`/service/mail?userId=${xEmail.value}`, {
        method: "POST"
    })
})
let emailCheckflag=0;
$('.email-check-btn').click(function() {
    fetch(`/service/verifyCode?code=${xEmailCheck.value}`, {
        method: "POST"
    }).then(function(response) {
        return response.json()
    }).then(function(result) {
        if (result==1){
            window.alert("인증이 확인되었습니다.")
            emailCheckflag=1;
        }else{
            window.alert("인증번호가 올바르지 않습니다.")
            emailCheckflag=0;
        }
    })
})




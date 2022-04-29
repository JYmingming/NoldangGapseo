import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();


var xProfile = document.querySelector(".user_photo");
var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");
var xPassword = document.querySelector("#password2");
var xPasswordCheck = document.querySelector("#password3");

var UBtn = document.querySelector("#btn2");

fetch("/user/getLoginUser")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result.data);
    
     
     var user = result.data;
     
     xProfile.src = user.profileImg;
     xInfoNick.innerHTML = user.nickName;
     xInfoEmail.innerHTML = user.email;
     

var arr = location.href.split('?');

if (arr.length == 1) {
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = user.userId;
var name = user.nickName;

console.log(no);


$('#col4').on('click', function (e) {
    e.preventDefault();
    location.href = `withDrawal.html?userId=${no}`;
});

$('#img2').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
});

UBtn.onclick = function() {
  if (xPassword.value != xPasswordCheck.value ) {
      window.alert("비밀번호를 다시 확인해주세요");
      return;
    }
      window.alert("비밀번호가 정상적으로 수정되었습니다! 다시 로그인해 주세요.");
      fetch("/user/signout").then(function(response) {
            location.href = "../../indexPage/index.html";
           });
    }
})


import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();
var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get("userId");

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}


var xNick = document.querySelector("#x-nick");
var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");
var xProfile = document.querySelector(".user_photo");
    
fetch(`/user/get?userId=${no}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    if (result.status == "fail") {
      window.alert("서버 요청 오류!");
      console.log(result.data);
      return;
    }
  
    var user = result.data;
         
    xNick.innerHTML = user.nickName;
    xInfoNick.innerHTML = user.nickName;
    xInfoEmail.innerHTML = user.email;
    xProfile.src = user.profileImg;
    
var name = user.nickName;

$('#img2').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
  });
});

        // 비밀번호 재확인
      
       /* var xPassword = document.querySelector("#password");

        document.querySelector("form[name=form2]").onsubmit = function() {
            if ( xPassword.value == "" ) {
                window.alert("필수 입력 항목이 비어 있습니다.");
                return false;
            }
            var fd = new FormData(document.forms.namedItem("form2"));

            fetch("/user/resignin", {
                method: "POST",
                body: new URLSearchParams(fd)
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    if (result.resStatus == "success") {
                        location.href = "../info/infoManage.html";
                    } else {
                        window.alert("비밀번호가 맞지 않습니다!")
                    }
                });
            return false;*/
document.querySelector("#btn2").onclick = function() {
fetch(`/user/delete?userId=${no}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    
    if (result.resStatus == "success") {
      window.alert("회원탈퇴가 정상적으로 이루어졌습니다!");
      fetch("/user/signout").then(function(response) {
            location.href = "../../indexPage/index.html";
      });
    } else {
      window.alert("회원탈퇴 실패!");
      console.log(result.data);
      }
    });
    


};

